if(!self.define){let r,s={};const n=(n,e)=>(n=new URL(n+".js",e).href,s[n]||new Promise((s=>{if("document"in self){const r=document.createElement("script");r.src=n,r.onload=s,document.head.appendChild(r)}else r=n,importScripts(n),s()})).then((()=>{let r=s[n];if(!r)throw new Error(`Module ${n} didn’t register its module`);return r})));self.define=(e,u)=>{const i=r||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let l={};const o=r=>n(r,i),a={module:{uri:i},exports:l,require:o};s[i]=Promise.all(e.map((r=>a[r]||o(r)))).then((r=>(u(...r),l)))}}define(["./workbox-79ffe3e0"],(function(r){"use strict";r.setCacheNameDetails({prefix:"graph-gun"}),self.addEventListener("message",(r=>{r.data&&"SKIP_WAITING"===r.data.type&&self.skipWaiting()})),r.precacheAndRoute([{url:"/graph-gun/css/616.a05fd001.css",revision:null},{url:"/graph-gun/css/app.573586f7.css",revision:null},{url:"/graph-gun/index.html",revision:"5ab6875e4259f86a200244c3403fcdae"},{url:"/graph-gun/js/202.b037363f.js",revision:null},{url:"/graph-gun/js/541.4ab88190.js",revision:null},{url:"/graph-gun/js/616.6b423ec3.js",revision:null},{url:"/graph-gun/js/623.fec8524d.js",revision:null},{url:"/graph-gun/js/662.c33135a7.js",revision:null},{url:"/graph-gun/js/757.2b02d31b.js",revision:null},{url:"/graph-gun/js/838.9222d28b.js",revision:null},{url:"/graph-gun/js/app.2dc7570d.js",revision:null},{url:"/graph-gun/js/chunk-vendors.d27579d3.js",revision:null},{url:"/graph-gun/manifest.json",revision:"06c1ad76c586dafac8bd9f3296d4e60f"},{url:"/graph-gun/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map