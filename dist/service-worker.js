if(!self.define){let e,r={};const s=(s,n)=>(s=new URL(s+".js",n).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,u)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(r[l])return;let i={};const o=e=>s(e,l),a={module:{uri:l},exports:i,require:o};r[l]=Promise.all(n.map((e=>a[e]||o(e)))).then((e=>(u(...e),i)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"graph-gun"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/graph-gun/css/748.a05fd001.css",revision:null},{url:"/graph-gun/css/app.573586f7.css",revision:null},{url:"/graph-gun/index.html",revision:"ed9ace69a32221e71e306ec8a8264b6e"},{url:"/graph-gun/js/202.b037363f.js",revision:null},{url:"/graph-gun/js/411.f8903284.js",revision:null},{url:"/graph-gun/js/541.4ab88190.js",revision:null},{url:"/graph-gun/js/623.fec8524d.js",revision:null},{url:"/graph-gun/js/748.25afc3e6.js",revision:null},{url:"/graph-gun/js/757.8ee8bd42.js",revision:null},{url:"/graph-gun/js/79.82718356.js",revision:null},{url:"/graph-gun/js/838.9222d28b.js",revision:null},{url:"/graph-gun/js/app.58ea7844.js",revision:null},{url:"/graph-gun/js/chunk-vendors.3ce4e815.js",revision:null},{url:"/graph-gun/manifest.json",revision:"06c1ad76c586dafac8bd9f3296d4e60f"},{url:"/graph-gun/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
