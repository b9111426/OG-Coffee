"use strict";(self["webpackChunkog_coffee"]=self["webpackChunkog_coffee"]||[]).push([[940],{4804:function(t,e,a){a.r(e),a.d(e,{default:function(){return _}});var s=a(6252),c=a(3577);const i={class:"container py-5"},r={class:"bg-light p-3 py-5 shadow-sm"},n={class:"mb-3"},l={href:"javascript:;"},o={class:"text-end px-3"},d={class:""},h={class:"ps-3"},u={class:"ck-content text-start",ref:"content"};function p(t,e,a,p,f,g){const w=(0,s.Q2)("date");return(0,s.wg)(),(0,s.iD)("div",i,[(0,s._)("article",r,[(0,s._)("h2",n,(0,c.zw)(f.article.title),1),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(f.article.tag,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{class:"mb-3 px-3 text-start",key:e+12345},[(0,s._)("a",l,"#"+(0,c.zw)(t),1)])))),128)),(0,s._)("div",o,[(0,s._)("span",d,(0,c.zw)(f.article.author),1),(0,s.wy)((0,s._)("span",h,null,512),[[w,f.article.create_at]])]),(0,s._)("div",u,null,512)])])}var f={data(){return{article:{}}},created(){this.$store.dispatch("handLoading",!0),this.getArticleDetail()},mounted(){},methods:{async getArticleDetail(){const{id:t}=this.$route.params,e=await this.$store.dispatch("Articles/getArticleDetail",t);this.article=e.data.article,this.$refs.content.innerHTML=e.data.article.content,this.$store.dispatch("handLoading",!1)}}},g=a(3744);const w=(0,g.Z)(f,[["render",p]]);var _=w}}]);
//# sourceMappingURL=940.b2ab1837.js.map