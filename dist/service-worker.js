if(!self.define){let r,s={};const e=(e,n)=>(e=new URL(e+".js",n).href,s[e]||new Promise((s=>{if("document"in self){const r=document.createElement("script");r.src=e,r.onload=s,document.head.appendChild(r)}else r=e,importScripts(e),s()})).then((()=>{let r=s[e];if(!r)throw new Error(`Module ${e} didn’t register its module`);return r})));self.define=(n,u)=>{const i=r||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let l={};const o=r=>e(r,i),a={module:{uri:i},exports:l,require:o};s[i]=Promise.all(n.map((r=>a[r]||o(r)))).then((r=>(u(...r),l)))}}define(["./workbox-79ffe3e0"],(function(r){"use strict";r.setCacheNameDetails({prefix:"graph-gun"}),self.addEventListener("message",(r=>{r.data&&"SKIP_WAITING"===r.data.type&&self.skipWaiting()})),r.precacheAndRoute([{url:"/graph-gun/css/8.d97e7fdf.css",revision:null},{url:"/graph-gun/css/app.573586f7.css",revision:null},{url:"/graph-gun/index.html",revision:"578408319a04abd38ee4d296c0a5f15f"},{url:"/graph-gun/js/176.ca023105.js",revision:null},{url:"/graph-gun/js/202.b037363f.js",revision:null},{url:"/graph-gun/js/284.94ab8636.js",revision:null},{url:"/graph-gun/js/623.fec8524d.js",revision:null},{url:"/graph-gun/js/757.6902ae93.js",revision:null},{url:"/graph-gun/js/8.473e5f57.js",revision:null},{url:"/graph-gun/js/838.9222d28b.js",revision:null},{url:"/graph-gun/js/app.d1989344.js",revision:null},{url:"/graph-gun/js/chunk-vendors.d27579d3.js",revision:null},{url:"/graph-gun/manifest.json",revision:"06c1ad76c586dafac8bd9f3296d4e60f"},{url:"/graph-gun/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
