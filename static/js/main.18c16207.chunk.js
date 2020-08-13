(this["webpackJsonptoken-audit"]=this["webpackJsonptoken-audit"]||[]).push([[0],{178:function(e){e.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]')},180:function(e,t,n){e.exports=n(458)},185:function(e,t,n){},187:function(e,t,n){},199:function(e,t){},207:function(e,t){},224:function(e,t){},226:function(e,t){},241:function(e,t){},243:function(e,t){},391:function(e,t){},402:function(e,t){},405:function(e,t){},458:function(e,t,n){"use strict";n.r(t);var a=n(7),r=n.n(a),u=n(175),i=n.n(u),l=(n(185),n(24)),s=n.n(l),o=n(176),c=n(177),d=n(21),p=(n(187),n(178)),m=n(179),y=n.n(m),b=n(11),f={},v={pending:"Waiting to start",running:"Auditing transactions...",fraud:"Fraud discovered!",complete:"Token history verified successfully"};var j=function(){var e=Object(a.useState)(null),t=Object(d.a)(e,2),n=t[0],u=t[1],i=Object(a.useState)("0xc00e94cb662c3520282e6f5717214004a7f26888"),l=Object(d.a)(i,2),m=l[0],j=l[1],h=Object(a.useState)(!1),O=Object(d.a)(h,2),T=O[0],g=O[1],E=Object(a.useState)("9601359"),k=Object(d.a)(E,2),w=k[0],S=k[1],x=Object(a.useState)(""),B=Object(d.a)(x,2),N=B[0],V=B[1],C=Object(a.useState)("0"),M=Object(d.a)(C,2),W=M[0],A=M[1],J=Object(a.useState)("0"),F=Object(d.a)(J,2),I=F[0],P=F[1],R=Object(a.useState)(0),L=Object(d.a)(R,2),U=L[0],$=L[1],q=Object(a.useState)(0),z=Object(d.a)(q,2),D=z[0],G=z[1],H=Object(a.useState)(0),K=Object(d.a)(H,2),Q=K[0],X=K[1],Y=Object(a.useState)("pending"),Z=Object(d.a)(Y,2),_=Z[0],ee=Z[1],te=function(){var e=Object(c.a)(s.a.mark((function e(){var t,a,r,u,i,l,c,d,v,j,h,O,T,E,k;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(!0),ee("running"),t="injected"===n?window.ethereum:n,a=new y.a(t),r=new a.eth.Contract(p,m),e.next=7,r.methods.totalSupply().call();case 7:return u=e.sent,V(u),i="0",l="0",c=0,d=function(e,t,n){if(f[e]||(c++,$(c),f[e]=Object(b.toBN)("0")),"in"===n)f[e]=f[e].add(Object(b.toBN)(t));else{if(Object(b.toBN)(t).gt(f[e]))throw new Error("Fraud!");f[e]=f[e].sub(Object(b.toBN)(t))}},e.next=15,a.eth.getBlockNumber();case 15:v=e.sent,j=parseInt(w),h=j;case 18:if(!(h<v+3e3)){e.next=52;break}return G(h),e.next=22,r.getPastEvents(["Mint","Burn"],{fromBlock:h,toBlock:h+3e3-1});case 22:O=e.sent,T=Object(o.a)(O),e.prev=24,T.s();case 26:if((E=T.n()).done){e.next=41;break}k=E.value,e.prev=28,"Transfer"===k.event&&"0x0000000000000000000000000000000000000000"===k.returnValues.from?(X(++Q),i=a.utils.toBN(i).add(a.utils.toBN(k.returnValues.value)).toString(),A(i),l=a.utils.toBN(l).add(a.utils.toBN(k.returnValues.value)).toString(),P(l),f[k.returnValues.to]||d(k.returnValues.to,k.returnValues.value,"in")):"Transfer"===k.event&&(X(++Q),d(k.returnValues.from,k.returnValues.value,"out"),d(k.returnValues.to,k.returnValues.value,"in"),"0x0000000000000000000000000000000000000000"===k.returnValues.to&&(l=a.utils.toBN(l).sub(a.utils.toBN(k.returnValues.value)).toString(),P(l))),e.next=39;break;case 32:return e.prev=32,e.t0=e.catch(28),console.log(e.t0),console.log("fraud",k,f[k.returnValues.to].toString(),f[k.returnValues.from].toString()),g(!1),ee("fraud"),e.abrupt("return");case 39:e.next=26;break;case 41:e.next=46;break;case 43:e.prev=43,e.t1=e.catch(24),T.e(e.t1);case 46:return e.prev=46,T.f(),e.finish(46);case 49:h+=3e3,e.next=18;break;case 52:g(!1),ee("complete");case 54:case"end":return e.stop()}}),e,null,[[24,43,46,49],[28,32]])})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("div",null,"Connect to a node:"),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"node",disabled:!window.ethereum,checked:"injected"===n,onClick:function(){return u("injected")}}),"Injected provider (Metamask)")),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"node",disabled:!window.ethereum,checked:n&&"injected"!==n}),r.a.createElement("input",{value:n&&"injected"!==n?n:"",onChange:function(e){return u(e.target.value)},placeholder:"JSONRPC URL"}))),r.a.createElement("div",null,"Token address",r.a.createElement("input",{value:m,onChange:function(e){return j(e.target.value)},disabled:T})),r.a.createElement("div",null,"Token deploy block",r.a.createElement("input",{type:"number",value:w,onChange:function(e){return S(e.target.value)},disabled:T})),r.a.createElement("button",{disabled:T||!n,onClick:te},"Scan"),r.a.createElement("div",null,v[_]),r.a.createElement("div",null,"totalSupply(): ",Object(b.fromWei)(N,"ether")),r.a.createElement("div",null,"Calculated supply: ",Object(b.fromWei)(W,"ether")),r.a.createElement("div",null,"Calculated supply (excluding burns): ",Object(b.fromWei)(I,"ether")),r.a.createElement("div",null,"Number of accounts: ",U),r.a.createElement("div",null,"Block: ",D),r.a.createElement("div",null,"Transfers: ",Q)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[180,1,2]]]);
//# sourceMappingURL=main.18c16207.chunk.js.map