"use strict";(self["webpackChunkgraph_gun"]=self["webpackChunkgraph_gun"]||[]).push([[698],{7698:function(e,s,r){r.r(s),r.d(s,{default:function(){return l}});var n=function(){var e=this,s=e._self._c;return s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{placeholder:"username"},domProps:{value:e.username},on:{input:function(s){s.target.composing||(e.username=s.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{placeholder:"password",type:"password"},domProps:{value:e.password},on:{input:function(s){s.target.composing||(e.password=s.target.value)}}}),s("button",{on:{click:e.login}},[e._v("login")]),s("button",{on:{click:e.signup}},[e._v("sign up")])])},t=[],o={name:"LoginView",data(){return{username:void 0,password:void 0}},methods:{login(){console.log("login"),this.user.auth(this.username,this.password,(({err:e})=>e&&alert(e)))},signup(){console.log("signup"),this.user.create(this.username,this.password,(({err:e})=>{e?alert(e):this.login()}))}},computed:{user(){return this.$store.state.user}}},a=o,u=r(1001),i=(0,u.Z)(a,n,t,!1,null,null,null),l=i.exports}}]);
//# sourceMappingURL=698.747a397b.js.map