"use strict";(self.webpackChunkcitation_generator=self.webpackChunkcitation_generator||[]).push([[691],{26447:function(e,t,n){var r=n(63366),o=n(87462),a=n(67294),i=n(95408),s=n(62605),c=n(39707),l=n(59766),m=n(90948),d=n(71657),u=n(85893);const p=["component","direction","spacing","divider","children"];function f(e,t){const n=a.Children.toArray(e).filter(Boolean);return n.reduce(((e,r,o)=>(e.push(r),o<n.length-1&&e.push(a.cloneElement(t,{key:`separator-${o}`})),e)),[])}const g=(0,m.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>[t.root]})((({ownerState:e,theme:t})=>{let n=(0,o.Z)({display:"flex",flexDirection:"column"},(0,i.k9)({theme:t},(0,i.P$)({values:e.direction,breakpoints:t.breakpoints.values}),(e=>({flexDirection:e}))));if(e.spacing){const r=(0,s.hB)(t),o=Object.keys(t.breakpoints.values).reduce(((t,n)=>(("object"==typeof e.spacing&&null!=e.spacing[n]||"object"==typeof e.direction&&null!=e.direction[n])&&(t[n]=!0),t)),{}),a=(0,i.P$)({values:e.direction,base:o}),c=(0,i.P$)({values:e.spacing,base:o});"object"==typeof a&&Object.keys(a).forEach(((e,t,n)=>{if(!a[e]){const r=t>0?a[n[t-1]]:"column";a[e]=r}}));const m=(t,n)=>{return{"& > :not(style) + :not(style)":{margin:0,[`margin${o=n?a[n]:e.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[o]}`]:(0,s.NA)(r,t)}};var o};n=(0,l.Z)(n,(0,i.k9)({theme:t},c,m))}return n=(0,i.dt)(t.breakpoints,n),n})),Z=a.forwardRef((function(e,t){const n=(0,d.Z)({props:e,name:"MuiStack"}),a=(0,c.Z)(n),{component:i="div",direction:s="column",spacing:l=0,divider:m,children:Z}=a,y=(0,r.Z)(a,p),b={direction:s,spacing:l};return(0,u.jsx)(g,(0,o.Z)({as:i,ownerState:b,ref:t},y,{children:m?f(Z,m):Z}))}));t.Z=Z},53180:function(e,t,n){n.r(t),n.d(t,{default:function(){return J}});var r=n(81880),o=n(67294),a=n(84576),i=n(43904),s=n(15725),c=n(42440),l=n(59334),m=n(87462),d=n(63366),u=n(86010),p=n(94780),f=n(90948),g=n(71657),Z=n(64680),y=n(1588),b=n(34867);function h(e){return(0,b.Z)("MuiCard",e)}(0,y.Z)("MuiCard",["root"]);var v=n(85893);const E=["className","raised"],C=(0,f.ZP)(Z.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"})));var x=o.forwardRef((function(e,t){const n=(0,g.Z)({props:e,name:"MuiCard"}),{className:r,raised:o=!1}=n,a=(0,d.Z)(n,E),i=(0,m.Z)({},n,{raised:o}),s=(e=>{const{classes:t}=e;return(0,p.Z)({root:["root"]},h,t)})(i);return(0,v.jsx)(C,(0,m.Z)({className:(0,u.Z)(s.root,r),elevation:o?8:void 0,ref:t,ownerState:i},a))}));function M(e){return(0,b.Z)("MuiCardMedia",e)}(0,y.Z)("MuiCardMedia",["root","media","img"]);const w=["children","className","component","image","src","style"],k=(0,f.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{isMediaComponent:r,isImageComponent:o}=n;return[t.root,r&&t.media,o&&t.img]}})((({ownerState:e})=>(0,m.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"}))),S=["video","audio","picture","iframe","img"],R=["picture","img"];var P=o.forwardRef((function(e,t){const n=(0,g.Z)({props:e,name:"MuiCardMedia"}),{children:r,className:o,component:a="div",image:i,src:s,style:c}=n,l=(0,d.Z)(n,w),f=-1!==S.indexOf(a),Z=!f&&i?(0,m.Z)({backgroundImage:`url("${i}")`},c):c,y=(0,m.Z)({},n,{component:a,isMediaComponent:f,isImageComponent:-1!==R.indexOf(a)}),b=(e=>{const{classes:t,isMediaComponent:n,isImageComponent:r}=e,o={root:["root",n&&"media",r&&"img"]};return(0,p.Z)(o,M,t)})(y);return(0,v.jsx)(k,(0,m.Z)({className:(0,u.Z)(b.root,o),as:a,role:!f&&i?"img":void 0,ref:t,style:Z,ownerState:y,src:f?i||s:void 0},l,{children:r}))}));function j(e){return(0,b.Z)("MuiCardContent",e)}(0,y.Z)("MuiCardContent",["root"]);const N=["className","component"],I=(0,f.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}})));var B=o.forwardRef((function(e,t){const n=(0,g.Z)({props:e,name:"MuiCardContent"}),{className:r,component:o="div"}=n,a=(0,d.Z)(n,N),i=(0,m.Z)({},n,{component:o}),s=(e=>{const{classes:t}=e;return(0,p.Z)({root:["root"]},j,t)})(i);return(0,v.jsx)(I,(0,m.Z)({as:o,className:(0,u.Z)(s.root,r),ownerState:i,ref:t},a))})),L=n(2658);function T(e){return(0,b.Z)("MuiCardActions",e)}(0,y.Z)("MuiCardActions",["root","spacing"]);const z=["disableSpacing","className"],A=(0,f.ZP)("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disableSpacing&&t.spacing]}})((({ownerState:e})=>(0,m.Z)({display:"flex",alignItems:"center",padding:8},!e.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})));var O,$,D=o.forwardRef((function(e,t){const n=(0,g.Z)({props:e,name:"MuiCardActions"}),{disableSpacing:r=!1,className:o}=n,a=(0,d.Z)(n,z),i=(0,m.Z)({},n,{disableSpacing:r}),s=(e=>{const{classes:t,disableSpacing:n}=e,r={root:["root",!n&&"spacing"]};return(0,p.Z)(r,T,t)})(i);return(0,v.jsx)(A,(0,m.Z)({className:(0,u.Z)(s.root,o),ownerState:i,ref:t},a))})),W=n(72642),G=n(26447),F=n(70576),_=n(95200),Q=n(39147),U=n(10932),X=n(4402);const q=(0,U.Z)(F.ZP)(O||(O=(0,r.Z)(["\n  padding-right: 0;\n  padding-left: 0;\n"]))),H=(0,U.Z)(W.Z)($||($=(0,r.Z)(["\n  display: block;\n  font-family: sans-serif;\n  font-style: normal;\n  font-weight: 300;\n  font-size: 14px;\n  color: #37293c;\n  text-align: center;\n  :hover {\n    text-decoration: underline;\n  }\n"])));var J=()=>o.createElement(a.Z,null,o.createElement(i.Z,{title:"Citation Creator / Generator",description:"Create citation online rapidly free for a wide range of CSL styles"}),o.createElement(s.ZP,{container:!0,height:"100%"},o.createElement(s.ZP,{bgcolor:"primary.main",container:!0,p:2,item:!0},o.createElement(s.ZP,{p:6,md:4,xs:12,item:!0},o.createElement(_.lc,null,"Create citation online rapidly free for a wide range of CSL styles"),o.createElement(_.go,null,o.createElement(c.Z,{disablePadding:!0},o.createElement(q,null,o.createElement(l.Z,{primary:"Create Citation Manually",secondary:"Create your citation manually rapidly for journals, books, websites, report"})),o.createElement(q,null,o.createElement(l.Z,{primary:"Import Citations",secondary:"Import citations from Title, URL, DOI, PubMed, ISBN, BibTeX"})),o.createElement(q,null,o.createElement(l.Z,{primary:"Export Citations",secondary:"Export your citations or references list to a PDF, Word, LaTex, BibTex Document"})),o.createElement(q,null,o.createElement(l.Z,{primary:"Store Citations",secondary:"Store citation in your browser to create your own references list"}))))),o.createElement(s.ZP,{container:!0,md:8,xs:12,item:!0,justifyContent:"center",p:4,height:{md:"80%"}},o.createElement(s.ZP,{item:!0,display:{md:"flex"},md:6,p:2},o.createElement(x,{sx:{maxWidth:{md:350,xs:150},bgcolor:"primary.50",borderRadius:"50px 50px 0 0"}},o.createElement(P,null,o.createElement(Q.jl,null)),o.createElement(B,null,o.createElement(_.T7,null,"Bibliographies / References List"),o.createElement(L.Z,{pt:2,pb:8,variant:"body2",color:"text.secondary"},"Create Bibliographies list from your citations or imported citations, also there an editor to help with editing list before exporting them")),o.createElement(D,null,o.createElement(W.Z,{variant:"outlined",size:"small",href:"/citationsList/"},"List Generator")))),o.createElement(s.ZP,{item:!0,display:{md:"flex"},md:6,p:2},o.createElement(x,{sx:{maxWidth:{md:350,xs:150},bgcolor:"primary.50",borderRadius:"50px 50px 0 0"}},o.createElement(P,null,o.createElement(Q.bz,null)),o.createElement(B,null,o.createElement(_.T7,null,"Reference Management"),o.createElement(L.Z,{pt:2,variant:"body2",color:"text.secondary"},"Manage your references by organizing them in collections and tags. The goal of reference management is to make it easier for researchers to manage the information they use in their work and to generate accurate and consistent citations and bibliographies.")),o.createElement(D,null,o.createElement(W.Z,{variant:"outlined",size:"small",href:"/referencesManager/"},"Manage References")))))),o.createElement(s.ZP,{bgcolor:"primary.light",container:!0,xs:12,item:!0},o.createElement(s.ZP,{md:7,p:6,item:!0},o.createElement(G.Z,{alignItems:"start",py:2},o.createElement(_.go,null,"Generate Annotated Bibliography for:"),o.createElement(G.Z,{direction:"row"},Object.values(X.tQ).map((e=>{let{id:t,label:n}=e;return o.createElement(H,{key:t,size:"small",href:"/"+t.toLowerCase()+"/"},n)}))))),o.createElement(s.ZP,{md:5,item:!0,container:!0,alignItems:"center",justifyContent:"center"},o.createElement(P,{sx:{maxWidth:{md:400,xs:200}}},o.createElement(Q.SZ,null))))))}}]);
//# sourceMappingURL=component---src-pages-index-tsx-619aefdbeb2e71dea744.js.map