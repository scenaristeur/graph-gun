if(!self.define){let r,s={};const n=(n,e)=>(n=new URL(n+".js",e).href,s[n]||new Promise((s=>{if("document"in self){const r=document.createElement("script");r.src=n,r.onload=s,document.head.appendChild(r)}else r=n,importScripts(n),s()})).then((()=>{let r=s[n];if(!r)throw new Error(`Module ${n} didn’t register its module`);return r})));self.define=(e,u)=>{const l=r||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let i={};const o=r=>n(r,l),a={module:{uri:l},exports:i,require:o};s[l]=Promise.all(e.map((r=>a[r]||o(r)))).then((r=>(u(...r),i)))}}define(["./workbox-79ffe3e0"],(function(r){"use strict";r.setCacheNameDetails({prefix:"graph-gun"}),self.addEventListener("message",(r=>{r.data&&"SKIP_WAITING"===r.data.type&&self.skipWaiting()})),r.precacheAndRoute([{url:"/graph-gun/css/748.a05fd001.css",revision:null},{url:"/graph-gun/css/app.573586f7.css",revision:null},{url:"/graph-gun/index.html",revision:"f860f271ac84995886ffcf962b1faca0"},{url:"/graph-gun/js/12.5eec1351.js",revision:null},{url:"/graph-gun/js/202.b037363f.js",revision:null},{url:"/graph-gun/js/541.4ab88190.js",revision:null},{url:"/graph-gun/js/748.25afc3e6.js",revision:null},{url:"/graph-gun/js/757.8ee8bd42.js",revision:null},{url:"/graph-gun/js/79.82718356.js",revision:null},{url:"/graph-gun/js/816.6f85a2a7.js",revision:null},{url:"/graph-gun/js/923.a7690c58.js",revision:null},{url:"/graph-gun/js/993.a0712000.js",revision:null},{url:"/graph-gun/js/app.4011b83f.js",revision:null},{url:"/graph-gun/js/chunk-vendors.3ce4e815.js",revision:null},{url:"/graph-gun/manifest.json",revision:"06c1ad76c586dafac8bd9f3296d4e60f"},{url:"/graph-gun/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
