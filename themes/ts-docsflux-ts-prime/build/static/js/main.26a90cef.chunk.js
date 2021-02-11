(this["webpackJsonpts-docuflux-angelic-theme"]=this["webpackJsonpts-docuflux-angelic-theme"]||[]).push([[0],{166:function(e,t,n){},217:function(e,t,n){},266:function(e,t,n){},267:function(e,t,n){"use strict";n.r(t),n.d(t,"useDeps",(function(){return Fe}));var a={};n.r(a),n.d(a,"LayoutMode",(function(){return P})),n.d(a,"layout",(function(){return A})),n.d(a,"THEME_KEY",(function(){return L})),n.d(a,"theme",(function(){return B}));var r={};n.r(r),n.d(r,"getPackageName",(function(){return we})),n.d(r,"excerptTokensToString",(function(){return je})),n.d(r,"getMembers",(function(){return Oe})),n.d(r,"parseComment",(function(){return xe})),n.d(r,"groupMembers",(function(){return Me}));var c=n(158),i=n(52),o=n.n(i),l=n(57),u=n(77),m=n(0),s=n.n(m),d=n(19),f=n.n(d),p=(n(166),n(273)),h=n(282),g=n(289),v=n(59),b=n(29),E=n(272),y=n(270),k=n(40),w=n(130),j=n.n(w),O=n(106),x=n.n(O),M=n(131),_=n.n(M);function N(e){var t;return null===(t=window)||void 0===t?void 0:t.js_beautify(e,{indent_size:"4",indent_char:" ",max_preserve_newlines:"5",preserve_newlines:!0,keep_array_indentation:!0,break_chained_methods:!1,indent_scripts:"keep",brace_style:"collapse,preserve-inline",space_before_conditional:!0,unescape_strings:!0,jslint_happy:!0,end_with_newline:!0,wrap_line_length:"0",indent_inner_html:!0,comma_first:!1,e4x:!0,indent_empty_lines:!0})}x.a.registerLanguage("typescript",_.a);var P,S=function(e){return s.a.createElement("div",{className:"markdown-body ".concat(e.narrow?"narrow":""),dangerouslySetInnerHTML:{__html:(t=e.markdown,j.a.setOptions({highlight:function(e){var t=y.a((function(){return x.a.highlight("typescript",e).value}));return k.c(t)?e:t}})(t))}});var t},C=n(56),z=n(92),R=n(132),T=n(14),I=n(271);!function(e){e[e.MOBILE=0]="MOBILE",e[e.DESKTOP=1]="DESKTOP"}(P||(P={}));var F=function(){function e(t){var n=this;if(Object(z.a)(this,e),this.breakpoints=t,this.screenSize=void 0,0===t.length)throw new Error("Please provide at least one breakpoint");this.screenSize=t[0].mode,this.calculateSize(),window.addEventListener("resize",(function(){n.calculateSize()}))}return Object(R.a)(e,[{key:"calculateSize",value:function(){var e=this.breakpoints.filter((function(e){return e.width<=window.innerWidth}));this.screenSize=I.a(e,(function(e){return e.width}))[0].mode}},{key:"size",value:function(e){return e[this.screenSize]}}]),e}(),A=Object(T.l)(new F([{width:1240,mode:"desktop"},{width:0,mode:"mobile"},{width:900,mode:"tablet"}])),L="ts-prime-theme",B=Object(T.l)(new function e(){Object(z.a)(this,e),this.theme="dark";var t=localStorage.getItem("ts-prime-theme")||"";this.theme=E.a(t,["dark","light"])?t:"dark"});Object(T.f)((function(){localStorage.setItem(L,B.theme)}));var D=p.a.Header,G=p.a.Content,K=p.a.Sider,H={home:{key:1,exact:!0,path:"/home",title:"Home"},documentation:{key:2,path:"/documentation",title:"Documentation"},documentationPage:{key:2,path:"/documentation/:fn",title:"Documentation"}},W=Object(C.a)((function(){var e=Fe();return s.a.createElement(D,{className:"header"},s.a.createElement(v.b,{to:"/home"},s.a.createElement("div",{className:"logo"},s.a.createElement("img",{alt:"logo",style:{width:100,height:"auto"},src:"".concat(e.basePath,"/logo.svg")}))),s.a.createElement("div",{className:"flex"}),s.a.createElement("div",{style:{paddingRight:20}},s.a.createElement(g.a,{onChange:function(){a.theme.theme="dark"===a.theme.theme?"light":"dark"},checked:"light"===a.theme.theme,checkedChildren:"Dark",unCheckedChildren:"Light"})),"dark"===a.theme.theme?s.a.createElement("div",null,s.a.createElement("a",{href:e.config.repositoryUrl},s.a.createElement("img",{alt:"Github",style:{width:"auto",height:"30px"},src:"".concat(e.basePath,"/github.white.svg")}))):s.a.createElement("div",null,s.a.createElement("a",{href:e.config.repositoryUrl},s.a.createElement("img",{alt:"Github",style:{width:"auto",height:"30px"},src:"".concat(e.basePath,"/github.svg")}))))})),U=Object(C.a)((function(e){var t;return s.a.createElement(p.a,{id:e.id,className:"".concat(null!==(t=e.className)&&void 0!==t?t:""),style:{padding:"0 ".concat(A.size({desktop:24,mobile:0,tablet:0}),"px 0px")}},s.a.createElement(G,{className:"content",style:{padding:A.size({desktop:24,mobile:0,tablet:0}),margin:0,minWidth:380,maxWidth:1280,minHeight:280}},e.children))})),Y=function(e){var t;return s.a.createElement(p.a,{className:"".concat(null!==(t=e.className)&&void 0!==t?t:""," view"),style:{height:"calc(100vh - 64px)",overflow:"hidden",overflowY:"auto"}},e.children)},J=function(){var e=Object(b.e)();return e.location.pathname.includes("/documentation")||null!=Object.values(H).find((function(t){return e.location.pathname===t.path}))||e.replace(H.home.path),null},$=Object(C.a)((function(e){return s.a.createElement(K,{width:A.size({mobile:"80%",desktop:400,tablet:300}),collapsible:!0,breakpoint:"lg",trigger:null,collapsedWidth:0,defaultCollapsed:A.size({mobile:!0,desktop:!1,tablet:!1}),className:"site-layout-background"},e.sideMenu)})),q=Object(C.a)((function(e){var t=E.a(a.theme.theme,["dark","light"])?a.theme.theme:"dark";return s.a.createElement(v.a,null,s.a.createElement(p.a,{className:"ts-prime-".concat(t)},s.a.createElement(W,null),s.a.createElement(b.a,H.home,s.a.createElement(Y,null,s.a.createElement($,{sideMenu:e.sideMenu}),s.a.createElement(U,null,s.a.createElement(h.a,null,s.a.createElement(S,{markdown:e.readme,narrow:!0}))))),s.a.createElement(b.a,H.documentation,s.a.createElement(Y,null,s.a.createElement($,{sideMenu:e.sideMenu}),s.a.createElement(U,{id:"main-view"},e.children))),s.a.createElement(J,null)))})),Q=n(286),V=n(284),X=n(290),Z=n(80),ee=n(111),te=["#fa8c16","#1890ff","#006d75","#08979c","#7cb305","#13c2c2","#0050b3","#003a8c","#9e1068"],ne=[].concat(te),ae=new Map;function re(e){var t=ae.get(e);if(null!=t)return t;var n=ne.shift();return null==n?(ne=[].concat(te),re(e)):(ae.set(e,n),n)}var ce=Object(C.a)((function(e){var t=Object(b.e)(),n=e.groupedMembers,a=Object(m.useMemo)((function(){return n.flatMap((function(e){return ee.a(e.members,(function(e){return e.name})).filter((function(e){return"Function"===e.kind})).filter((function(e){return e.name.includes(_e.search)})).map((function(e){return s.a.createElement(Q.a.Item,{key:e.canonicalReferenceGroup},s.a.createElement("div",{onClick:function(){t.replace("/documentation/".concat(e.name)),Ne("#link-".concat(e.name))},key:e.canonicalReference,style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},s.a.createElement("div",null,s.a.createElement("strong",null,e.name)),s.a.createElement("div",null,e.tags.map((function(e){return"Pipe"===e.value?"P":e.value})).map((function(e){return s.a.createElement(X.a,{key:e,color:re(e)},e)})))))}))}))}),[_e.search]);return s.a.createElement("div",{className:"side-bar-content",style:{height:"calc(100vh - 64px - 72px - 96px)",overflow:"hidden",overflowY:"auto"}},s.a.createElement(Q.a,{mode:"inline",defaultSelectedKeys:["1"],defaultOpenKeys:["sub1"],style:{height:"90%",borderRight:0}},a,0===a.length&&s.a.createElement(m.Fragment,null,s.a.createElement("div",{style:{height:30}}),s.a.createElement(Z.a,null)),s.a.createElement("div",{style:{height:100}})))})),ie=n(285),oe=n(283),le=n(274),ue=(n(217),ie.a.Panel),me=function(e){var t=e.docMember.members[0].comment.parsed.filter((function(e){return"@include"===e.tag})).map((function(e){if(Array.isArray(e.content)&&0!==e.content.length){var t=e.content.join("\n").split("\n").slice(0,1).join("");return s.a.createElement(ue,{header:s.a.createElement("h1",null,t.replace(/#+/,"")),key:"2"},s.a.createElement(S,{key:e.tag,markdown:e.content.join("\n").replace(t,"")}))}return null}));return s.a.createElement(h.a,{id:"link-".concat(e.docMember.name),key:"link-".concat(e.docMember.name),title:s.a.createElement(oe.a.Title,{level:4},e.docMember.name),style:{width:"100%"},extra:e.docMember.tags.map((function(e){return"Pipe"===e.value?"P":e.value})).map((function(e){return s.a.createElement(X.a,{key:e,color:re(e)},e)}))},s.a.createElement(S,{markdown:e.docMember.members[0].comment.description}),s.a.createElement("div",{style:{height:10}}),e.docMember.members[0].comment.parsed.filter((function(e){return"@warning"===e.tag})).map((function(e){return Array.isArray(e.content)?s.a.createElement("div",{key:e.tag,className:"warning"},s.a.createElement("div",{className:"dot"},"WARNING"),s.a.createElement("div",{className:"warning-text"},s.a.createElement(S,{markdown:e.content.join("\n")}))):null})),s.a.createElement("div",{style:{height:10}}),e.docMember.members[0].comment.parsed.filter((function(e){return"@description"===e.tag})).map((function(e){return Array.isArray(e.content)?s.a.createElement(S,{key:e.tag,markdown:e.content.join("\n")}):null})),s.a.createElement("div",{style:{height:10}}),0!==t.filter(k.b).length&&s.a.createElement(ie.a,null,e.docMember.members[0].comment.parsed.filter((function(e){return"@include"===e.tag})).map((function(e){if(Array.isArray(e.content)&&0!==e.content.length){var t=e.content.join("\n").split("\n").slice(0,1).join("");return s.a.createElement(ue,{header:t.replace(/#+/,""),key:"2"},s.a.createElement(S,{key:e.tag,markdown:e.content.join("\n").replace(t,"")}))}return null}))),s.a.createElement("div",null,s.a.createElement("div",{style:{height:30}}),s.a.createElement("div",null,le.a(e.docMember.members,1).flatMap((function(e){var t=e.comment.examples;return null===t||void 0===t?void 0:t.map((function(n,a){if(null==t)return null;var r=N(n);return s.a.createElement(m.Fragment,null,s.a.createElement("h1",null,"Example ",a+1),s.a.createElement("div",{key:e.canonicalReference},s.a.createElement(S,{markdown:"\n  ```typescript\n  ".concat(N(r),"\n  ```\n  ")})),s.a.createElement("div",{style:{height:10}}))}))})))),s.a.createElement("div",{style:{height:10}}))},se=n(288),de=n(100),fe=n(133),pe=n(275),he=n(276),ge=n(277),ve=n(278),be=n(287),Ee=n(279),ye=n(280),ke=n(281);function we(e){return{name:e.name,version:e.version}}function je(e){return e.map((function(e){return e.text})).join("").replace("declare","").replace(/\s+/gm," ")}function Oe(e){var t=e.members.find((function(e){return"EntryPoint"===e.kind}));if(null==t)throw new Error("Failed to find entry point");return fe.a(t.members,pe.a((function(e){return{kind:e.kind,name:e.name,comment:xe(e.docComment),excerptTokens:e.excerptTokens,canonicalReference:e.canonicalReference,package:e.canonicalReference.replace(/(!.+)/gm,""),canonicalReferenceGroup:e.canonicalReference.replace(/(:.*)/,"")}})),he.a((function(e){return e.canonicalReferenceGroup})),ge.a((function(e){var t=Object(l.a)(e,2),n=t[0],a=t[1];return[n,ve.a(Object(de.a)({members:a.map((function(e){return ve.a(e,["name","package"])}))},a[0]),["excerptTokens","comment"])]})),ge.a((function(e){var t=Object(l.a)(e,2),n=t[0],a=t[1],r=fe.a(a.members,be.a((function(e){return e.comment.parsed.filter((function(e){return["@category","@pipe"].includes(e.tag)})).flatMap((function(e){return k.a(e.content)?e.content.map((function(t){return{tag:e.tag,value:t}})):[]}))})),Ee.a((function(e){return"".concat(e.tag,"/").concat(e.value)})),ye.a((function(e){return"/"!==e.tag})));return[n,Object(de.a)(Object(de.a)({},a),{},{tags:r})]})),ke.a,pe.a((function(e){return Object(l.a)(e,2)[1]})))}function xe(e){var t=e.replace("/**","").replace("*/","").split(/^[ ]+?\*/gm).join("\n").trim().replace(/(@\w+)/gm,"###$1").split("###").map((function(e){return e.trim()}));return{description:t.filter((function(e){return!/@\w+/.test(e)}))[0],examples:[""],parsed:t.filter((function(e){return/@\w+/.test(e)})).map((function(e){var t=e.replace(/(@\w+)/,"$1##").split("##"),n=t[0],a=fe.a(t.slice(1),be.a((function(e){return e.split("\n").map((function(e){return e.trim()})).filter((function(e){return e}))})));return"@param"===n?{tag:n,content:a.map((function(e){var t;return{description:e.replace(/\w+/,"").trim().replace(/^-/,"").trim(),name:null===(t=e.match(/\w+/))||void 0===t?void 0:t[0]}}))[0]}:"@example"===n?{tag:n,content:a.map((function(e){return e}))}:{tag:n,content:a}}))}}function Me(e){return fe.a(e,he.a((function(e){var t=e.tags.find((function(e){return"@category"===e.tag}));return null==t?"utils":t.value.toLowerCase()})),ke.a,pe.a((function(e){var t=Object(l.a)(e,2);return{group:t[0],members:t[1]}})))}var _e=Object(T.l)({search:""});function Ne(e){return Pe.apply(this,arguments)}function Pe(){return(Pe=Object(u.a)(o.a.mark((function e(t){var n,a,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.a(Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",se.a((function(){return document.getElementById("main-view")}),1e3));case 1:case"end":return e.stop()}}),e)}))));case 2:if(n=e.sent,!k.c(n)){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,y.a(Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",se.a((function(){return document.querySelector(t)}),3e3));case 1:case"end":return e.stop()}}),e)}))));case 7:if(a=e.sent,!k.c(a)){e.next=10;break}return e.abrupt("return");case 10:r=a.getBoundingClientRect().top,n.scrollTo({top:r+n.scrollTop-100,behavior:"auto"});case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Se=Object(C.a)((function(e){var t=e.documentation.filter((function(e){return"Function"===e.kind})),n=r.groupMembers(t);return Object(m.useEffect)((function(){var e=window.location.hash.split("/").splice(-1)[0];Ne("#link-".concat(e))}),[]),s.a.createElement(q,{readme:e.readme,sideMenu:s.a.createElement(m.Fragment,null,s.a.createElement(Q.a,{theme:"light",mode:"vertical"},s.a.createElement(Q.a.Item,{key:H.home.key},s.a.createElement(v.b,{to:H.home.path},H.home.title)),s.a.createElement(Q.a.Item,{key:H.documentation.key},s.a.createElement(v.b,{to:H.documentation.path},H.documentation.title))),s.a.createElement("div",{style:{padding:10},className:"search-input"},s.a.createElement(V.a,{size:"large",placeholder:"Search",onKeyUp:function(e){return _e.search=e.currentTarget.value}})),s.a.createElement(ce,{groupedMembers:n}))},n.map((function(e){return s.a.createElement("div",{key:e.group},s.a.createElement("div",{key:e.group},e.members.map((function(e){return s.a.createElement(m.Fragment,{key:e.canonicalReference},s.a.createElement(me,{key:e.canonicalReference,docMember:e}),s.a.createElement("div",{style:{height:10}}))}))))})))})),Ce=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,291)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))},ze=n(110),Re=n.n(ze),Te=(n(266),function(){var e=Object(u.a)(o.a.mark((function e(){var t,n,a,r,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,se.a((function(){var e,t;return null===(e=document.getElementsByName("basePath"))||void 0===e||null===(t=e.item(0))||void 0===t?void 0:t.getAttribute("content")}),3e3);case 2:return t=e.sent,e.next=5,Promise.all([Re.a.get("".concat(t,"/data/data.json")).then((function(e){return e.data})),Re.a.get("".concat(t,"/data/config.json")).then((function(e){return e.data}))]);case 5:return n=e.sent,a=Object(l.a)(n,2),r=a[0],c=a[1],e.abrupt("return",{docs:r,config:c,basePath:t});case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),Ie=Object(m.createContext)(void 0);function Fe(){return Object(m.useContext)(Ie)}var Ae=function(){var e=function(e,t){var n=Object(m.useState)(void 0),a=Object(l.a)(n,2),r=a[0],i=a[1];return Object(m.useEffect)((function(){e().then((function(e){i(e)}))}),Object(c.a)(t||[])),r}((function(){return Te()}));return null==e?null:s.a.createElement(Ie.Provider,{value:e},s.a.createElement(Se,{key:"app",documentation:e.docs.docs,readme:e.docs.articles.readme}))};f.a.render(s.a.createElement(Ae,null),document.getElementById("root")),Ce()}},[[267,1,2]]]);
//# sourceMappingURL=main.26a90cef.chunk.js.map