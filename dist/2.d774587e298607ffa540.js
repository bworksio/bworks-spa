webpackJsonp([2],{210:function(e,t,r){"use strict";function n(e){r(366)}Object.defineProperty(t,"__esModule",{value:!0});var a=r(368),i=r(375),o=r(0),s=n,l=o(a.a,i.a,s,null,null);t.default=l.exports},366:function(e,t,r){var n=r(367);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);r(207)("32df0d80",n,!0)},367:function(e,t,r){t=e.exports=r(206)(!1),t.push([e.i,".node-bworks_article.full{padding-top:10rem}@media (max-width:767px){.node-bworks_article.full .meta{display:-ms-flexbox;display:-webkit-box;display:flex;-ms-flex-pack:justify;-webkit-box-pack:justify;justify-content:space-between}}@media (min-width:414px) and (max-width:767px){.node-bworks_article.full .category{-ms-flex-preferred-size:66%;flex-basis:66%}.node-bworks_article.full .date{-ms-flex-preferred-size:33%;flex-basis:33%}}@media (min-width:768px){.node-bworks_article.full .category{margin-bottom:2.14285rem}.node-bworks_article.full .html-wrapper{padding-left:8.3333%;padding-right:8.3333%}}@media (min-width:1024px){.node-bworks_article.full .title{display:-ms-flexbox;display:-webkit-box;display:flex}.node-bworks_article.full .title h1{-ms-flex-preferred-size:75%;flex-basis:75%;padding-right:25px}.node-bworks_article.full .title .meta{-ms-flex-preferred-size:25%;flex-basis:25%;text-align:right;display:-ms-flexbox;display:-webkit-box;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-ms-flex-pack:justify;-webkit-box-pack:justify;justify-content:space-between;margin-bottom:2.14285rem}.node-bworks_article.full .title .category{margin-bottom:0}}.node-bworks_article.full .title{margin-bottom:4rem}.node-bworks_article.full .category{font-weight:700;color:#a2a2a2;text-transform:uppercase}.node-bworks_article h1,.node-bworks_article h3{color:#4a4a4a}@media (max-width:767px){.node-bworks_article h1{font-size:1.28571rem;line-height:1.38889;letter-spacing:.06667em}}",""])},368:function(e,t,r){"use strict";var n=r(3),a=r.n(n),i=r(22),o=r(369),s=r.n(o),l=r(370),c=r(23);t.a={name:"PageBlog",props:{name:{type:String,required:!0},lang:{type:String,required:!0}},data:function(){return{node:{},otherArticles:[],footerNode:{}}},asyncData:function(e){var t=e.app,r=e.route,n=r.matched[0].props.default.lang;return t.$i18n.locale=n,t.$store.commit("setLanguage",n),t.$store.dispatch("getData",n)},created:function(){this.fetchData()},watch:{$route:function(e,t){this.fetchData()}},methods:{fetchData:function(){var e=this;return this.$store.dispatch("getData",this.lang).then(function(){e.node=e.$store.getters.getNodeByPath(e.$route.path,e.lang),e.footerNode=e.$store.getters.getNodesByType("bworks_footer",e.lang).shift(),e.otherArticles=e.$store.getters.getNodesByType("bworks_article",e.lang).sort(function(e,t){return e.field_date[0].value<t.field_date[0].value?-1:e.field_date[0].value>t.field_date[0].value?1:0}).filter(function(t){return t.nid[0].value!==e.node.nid[0].value}).slice(0,2)}).catch(function(){})},getAllFields:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return this.node.hasOwnProperty(e)?this.node[e]:t},getField:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"value",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Missing";if(this.node.hasOwnProperty(e)&&this.node[e][r]){var a=this.node[e][r];return"format"in a?this.fixUrls(a[t]):a[t]}return n},getType:function(){return this.getField("type","target_id")},fixUrls:function(e){return e.replace(/\ssrc="(\/[^\/"][^"]+)"/,function(e,t){return e.replace(t,a.a.api.baseUrl+t.substr(1))})},getTag:function(){var e=this.getField("field_tags","target_id",0,!1);return e?this.$store.getters.getTag(e,this.lang):this.$t("message.blog")}},meta:function(){var e=this.getField("field_meta_tags","value",0,!1);return e?s()(e):{title:this.getField("title")}},components:{ShareLinks:i.a,bworks_other_articles_block:l.a,bworks_footer:c.a}}},369:function(e,t,r){"use strict";(function(t){e.exports=function(e){function r(e,t){var n,a,l,c,d,f,u,g,p,h,b,m,_,w,k,v,x,y,$=0,C=function(e){return e};switch(t||(t=0),n=e.slice(t,t+1).toLowerCase(),a=t+2,n){case"i":C=function(e){return parseInt(e,10)},p=o(e,a,";"),$=p[0],g=p[1],a+=$+1;break;case"b":C=function(e){return 0!==parseInt(e,10)},p=o(e,a,";"),$=p[0],g=p[1],a+=$+1;break;case"d":C=function(e){return parseFloat(e)},p=o(e,a,";"),$=p[0],g=p[1],a+=$+1;break;case"n":g=null;break;case"s":h=o(e,a,":"),$=h[0],b=h[1],a+=$+2,p=s(e,a+1,parseInt(b,10)),$=p[0],g=p[1],a+=$+2,$!==parseInt(b,10)&&$!==g.length&&i("SyntaxError","String length mismatch");break;case"a":for(g={},l=o(e,a,":"),$=l[0],c=l[1],a+=$+2,f=parseInt(c,10),d=!0,m=0;m<f;m++)w=r(e,a),k=w[1],_=w[2],a+=k,v=r(e,a),x=v[1],y=v[2],a+=x,_!==m&&(d=!1),g[_]=y;if(d){for(u=new Array(f),m=0;m<f;m++)u[m]=g[m];g=u}a+=1;break;default:i("SyntaxError","Unknown / Unhandled data type(s): "+n)}return[n,a-t,C(g)]}var n="undefined"!=typeof window?window:t,a=function(e){for(var t=e.length,r=e.length-1;r>=0;r--){var n=e.charCodeAt(r);n>127&&n<=2047?t++:n>2047&&n<=65535&&(t+=2),n>=56320&&n<=57343&&r--}return t-1},i=function(e,t,r,a){throw new n[e](t,r,a)},o=function(e,t,r){for(var n=2,a=[],o=e.slice(t,t+1);o!==r;)n+t>e.length&&i("Error","Invalid"),a.push(o),o=e.slice(t+(n-1),t+n),n+=1;return[a.length,a.join("")]},s=function(e,t,r){var n,i,o;for(o=[],n=0;n<r;n++)i=e.slice(t+(n-1),t+n),o.push(i),r-=a(i);return[o.length,o.join("")]};return r(e+"",0)[2]}}).call(t,r(21))},370:function(e,t,r){"use strict";function n(e){r(371)}var a=r(373),i=r(374),o=r(0),s=n,l=o(a.a,i.a,s,null,null);t.a=l.exports},371:function(e,t,r){var n=r(372);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);r(207)("2cac4686",n,!0)},372:function(e,t,r){t=e.exports=r(206)(!1),t.push([e.i,".node-bworks_other_articles_block .container-fluid{padding-top:4rem;padding-bottom:1rem;background-color:#f3f3f3}.node-bworks_other_articles_block .container-fluid>h2{margin-bottom:2rem;padding-left:8.3333%}",""])},373:function(e,t,r){"use strict";var n=r(11);t.a={name:"bworks_other_articles_block",props:{lang:{type:String,required:!0},nodes:{type:Array,required:!0}},components:{bworks_article:n.a},i18n:{messages:{en:{other_posts:"Other posts"},de:{other_posts:"Weitere Artikel"}}}}},374:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:"node node-bworks_other_articles_block"},[r("div",{staticClass:"container-fluid"},[r("h2",[e._v(e._s(e.$t("other_posts")))]),r("ul",{staticClass:"row"},e._l(e.nodes,function(t){return r("li",{staticClass:"col-sm-6 col-md-4"},[r("bworks_article",{attrs:{nid:t.nid[0].value,lang:e.lang,viewMode:"list"}})],1)}))])])},a=[],i={render:n,staticRenderFns:a};t.a=i},375:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{key:e.lang+"/"+e.name,class:"page-"+e.name+" lang-"+e.lang,attrs:{id:"page"}},[r("div",{class:"node node-"+e.getType()+" full container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"title col-md-10 col-lg-8 offset-md-1 offset-lg-2"},[r("h1",[e._v(e._s(e.getField("title")))]),r("div",{staticClass:"meta"},[r("div",{staticClass:"category"},[e._v(e._s(e.getTag()))]),r("div",{staticClass:"date"},[e._v(e._s(e.getField("field_date")))])])]),r("div",{staticClass:"body col-lg-10 offset-lg-1",domProps:{innerHTML:e._s(e.getField("body"))}}),r("div",{staticClass:"col-md-10 offset-md-1"},[r("ShareLinks",{attrs:{type:"logo-only"}})],1)])]),r("bworks_other_articles_block",{attrs:{nodes:e.otherArticles,lang:e.lang}}),Object.keys(e.footerNode).length?r("bworks_footer",{attrs:{nid:e.footerNode.nid[0].value,lang:e.lang}}):e._e()],1)},a=[],i={render:n,staticRenderFns:a};t.a=i}});