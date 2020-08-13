import React, { useState } from 'react';
import './App.css';
import erc20 from './IERC20.json';
import Web3 from 'web3';
import { toBN, fromWei } from 'web3-utils';

const SCAN_SIZE = 3000;

let accounts = {};

const statuses = {
  pending: 'Waiting to start',
  running: 'Auditing transactions...',
  fraud: 'Fraud discovered!',
  complete: 'Token history verified successfully',
};

function App() {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState('0xc00e94cb662c3520282e6f5717214004a7f26888');
  const [running, setRunning] = useState(false);
  const [startBlock, setStartBlock] = useState('9601359');
  const [totalSupply, setTotalSupply] = useState('');
  const [calculatedSupply, setCalculatedSupply] = useState('0');
  const [calcSupplyLessBurn, setCalculatedSupplyLessBurn] = useState('0');
  const [numAccounts, setNumAccounts] = useState(0);
  const [block, setBlock] = useState(0);
  const [status, setStatus] = useState('pending');

  const scan = async () => {
    setRunning(true);
    setStatus('running');

    const web3Provider = provider === 'injected'
      ? window.ethereum
      : provider;

    const web3 = new Web3(web3Provider);
    const token = new web3.eth.Contract(erc20, address);

    const _supply = await token.methods.totalSupply().call();
    setTotalSupply(_supply);

    let _calculatedSupply = '0';
    let _calculatedSupplyLessBurn = '0';
    let _numAccounts = 0;

    const adjustAccount = (account, val, direction) => {
      if (!accounts[account]) {
        _numAccounts++;
        setNumAccounts(_numAccounts);
        accounts[account] = toBN('0');
      }

      if (direction === 'in') {
        accounts[account] = accounts[account].add(toBN(val));
      } else {
        if (toBN(val).gt(accounts[account])) {
          throw new Error('Fraud!');
        }
        accounts[account] = accounts[account].sub(toBN(val));
      }
    }

    let currentBlock = await web3.eth.getBlockNumber();

    const _startBlock = parseInt(startBlock);
    for (let fromBlock = _startBlock; fromBlock < currentBlock + SCAN_SIZE; fromBlock += SCAN_SIZE) {
      setBlock(fromBlock);
      const events = await token.getPastEvents(['Mint', 'Burn'], {
        fromBlock, toBlock: fromBlock + SCAN_SIZE - 1,
      });

      for (const event of events) {
        try {
          if (event.event === 'Transfer' && event.returnValues.from === '0x0000000000000000000000000000000000000000') {
            _calculatedSupply = web3.utils.toBN(_calculatedSupply).add(web3.utils.toBN(event.returnValues.value)).toString();
            setCalculatedSupply(_calculatedSupply);

            _calculatedSupplyLessBurn = web3.utils.toBN(_calculatedSupplyLessBurn).add(web3.utils.toBN(event.returnValues.value)).toString();
            setCalculatedSupplyLessBurn(_calculatedSupplyLessBurn);

            if (!accounts[event.returnValues.to]) {
              adjustAccount(event.returnValues.to, event.returnValues.value, 'in');
            }
          } else if (event.event === 'Transfer') {
            adjustAccount(event.returnValues.from, event.returnValues.value, 'out');
            adjustAccount(event.returnValues.to, event.returnValues.value, 'in');

            if (event.returnValues.to === '0x0000000000000000000000000000000000000000') {
              _calculatedSupplyLessBurn = web3.utils.toBN(_calculatedSupplyLessBurn).sub(web3.utils.toBN(event.returnValues.value)).toString();
              setCalculatedSupplyLessBurn(_calculatedSupplyLessBurn);
            }
          }
        } catch (e) {
          console.log('fraud', event, accounts[event.returnValues.to].toString(), accounts[event.returnValues.from].toString());
          setRunning(false);
          setStatus('fraud');
          return;
        }
      }
    }

    setRunning(false);
    setStatus('complete');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          Connect to a node:
        </div>
        <div>
          <label>
            <input type="radio" name="node" disabled={!window.ethereum} checked={provider === 'injected'} onClick={() => setProvider('injected')} />
            Injected provider (Metamask)
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="node" disabled={!window.ethereum} checked={provider && provider !== 'injected'} />
            <input value={(provider && provider !== 'injected') ? provider : ''} onChange={e => setProvider(e.target.value)} placeholder="JSONRPC URL" />
          </label>
        </div>

        <div>
          Token address
          <input value={address} onChange={e => setAddress(e.target.value)} disabled={running} />
        </div>

        <div>
          Token deploy block
          <input type="number" value={startBlock} onChange={e => setStartBlock(e.target.value)} disabled={running} />
        </div>

        <button disabled={running || !provider} onClick={scan}>Scan</button>
        <div>{statuses[status]}</div>

        <div>totalSupply(): {fromWei(totalSupply, 'ether')}</div>
        <div>Calculated supply: {fromWei(calculatedSupply, 'ether')}</div>
        <div>Calculated supply (excluding burns): {fromWei(calcSupplyLessBurn, 'ether')}</div>
        <div>Number of accounts: {numAccounts}</div>
        <div>Block: {block}</div>
      </header>
    </div>
  );
}

export default App;
