if(!self.define){let e,r={};const n=(n,s)=>(n=new URL(n+".js",s).href,r[n]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=r,document.head.appendChild(e)}else e=n,importScripts(n),r()})).then((()=>{let e=r[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,u)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(r[i])return;let l={};const o=e=>n(e,i),a={module:{uri:i},exports:l,require:o};r[i]=Promise.all(s.map((e=>a[e]||o(e)))).then((e=>(u(...e),l)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"graph-gun"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/graph-gun/css/app.3c3cad74.css",revision:null},{url:"/graph-gun/index.html",revision:"8dd277031984fdc6aec8b5aa4a283903"},{url:"/graph-gun/js/202.b037363f.js",revision:null},{url:"/graph-gun/js/261.c08c7043.js",revision:null},{url:"/graph-gun/js/4.2018180c.js",revision:null},{url:"/graph-gun/js/468.a8eb8db7.js",revision:null},{url:"/graph-gun/js/698.747a397b.js",revision:null},{url:"/graph-gun/js/about.52e84f3b.js",revision:null},{url:"/graph-gun/js/app.81e284a7.js",revision:null},{url:"/graph-gun/js/chunk-vendors.88dced2d.js",revision:null},{url:"/graph-gun/manifest.json",revision:"06c1ad76c586dafac8bd9f3296d4e60f"},{url:"/graph-gun/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
