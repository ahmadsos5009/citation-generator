"use strict";(self.webpackChunkcitation_generator=self.webpackChunkcitation_generator||[]).push([[245],{30995:function(e,t,n){n.d(t,{A:function(){return S}});var r=n(98587),a=n(58168),o=n(96540),i=n(34164),s=n(94521),l=n(64111),c=n(17245),m=n(81825),d=n(16606),u=n(39599),p=n(96970),f=n(89452),y=n(68248),A=n(74848);const g=["component","direction","spacing","divider","children","className","useFlexGap"],h=(0,p.A)(),b=(0,m.A)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function v(e){return(0,d.A)({props:e,name:"MuiStack",defaultTheme:h})}function E(e,t){const n=o.Children.toArray(e).filter(Boolean);return n.reduce(((e,r,a)=>(e.push(r),a<n.length-1&&e.push(o.cloneElement(t,{key:`separator-${a}`})),e)),[])}const C=({ownerState:e,theme:t})=>{let n=(0,a.A)({display:"flex",flexDirection:"column"},(0,f.NI)({theme:t},(0,f.kW)({values:e.direction,breakpoints:t.breakpoints.values}),(e=>({flexDirection:e}))));if(e.spacing){const r=(0,y.LX)(t),a=Object.keys(t.breakpoints.values).reduce(((t,n)=>(("object"==typeof e.spacing&&null!=e.spacing[n]||"object"==typeof e.direction&&null!=e.direction[n])&&(t[n]=!0),t)),{}),o=(0,f.kW)({values:e.direction,base:a}),i=(0,f.kW)({values:e.spacing,base:a});"object"==typeof o&&Object.keys(o).forEach(((e,t,n)=>{if(!o[e]){const r=t>0?o[n[t-1]]:"column";o[e]=r}}));const l=(t,n)=>{return e.useFlexGap?{gap:(0,y._W)(r,t)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${a=n?o[n]:e.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[a]}`]:(0,y._W)(r,t)}};var a};n=(0,s.A)(n,(0,f.NI)({theme:t},i,l))}return n=(0,f.iZ)(t.breakpoints,n),n};var x=n(11848),w=n(3541);const M=function(e={}){const{createStyledComponent:t=b,useThemeProps:n=v,componentName:s="MuiStack"}=e,m=t(C),d=o.forwardRef((function(e,t){const o=n(e),d=(0,u.A)(o),{component:p="div",direction:f="column",spacing:y=0,divider:h,children:b,className:v,useFlexGap:C=!1}=d,x=(0,r.A)(d,g),w={direction:f,spacing:y,useFlexGap:C},M=(0,l.A)({root:["root"]},(e=>(0,c.Ay)(s,e)),{});return(0,A.jsx)(m,(0,a.A)({as:p,ownerState:w,ref:t,className:(0,i.A)(M.root,v)},x,{children:h?E(b,h):b}))}));return d}({createStyledComponent:(0,x.Ay)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>(0,w.A)({props:e,name:"MuiStack"})});var S=M},42154:function(e,t,n){n.r(t),n.d(t,{default:function(){return K}});var r=n(75276),a=n(96540),o=n(65263),i=n(78818),s=n(8239),l=n(49799),c=n(82241),m=n(58168),d=n(98587),u=n(34164),p=n(64111),f=n(11848),y=n(3541),A=n(60538),g=n(27553),h=n(17245);function b(e){return(0,h.Ay)("MuiCard",e)}(0,g.A)("MuiCard",["root"]);var v=n(74848);const E=["className","raised"],C=(0,f.Ay)(A.A,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"})));var x=a.forwardRef((function(e,t){const n=(0,y.A)({props:e,name:"MuiCard"}),{className:r,raised:a=!1}=n,o=(0,d.A)(n,E),i=(0,m.A)({},n,{raised:a}),s=(e=>{const{classes:t}=e;return(0,p.A)({root:["root"]},b,t)})(i);return(0,v.jsx)(C,(0,m.A)({className:(0,u.A)(s.root,r),elevation:a?8:void 0,ref:t,ownerState:i},o))}));function w(e){return(0,h.Ay)("MuiCardMedia",e)}(0,g.A)("MuiCardMedia",["root","media","img"]);const M=["children","className","component","image","src","style"],S=(0,f.Ay)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{isMediaComponent:r,isImageComponent:a}=n;return[t.root,r&&t.media,a&&t.img]}})((({ownerState:e})=>(0,m.A)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"}))),k=["video","audio","picture","iframe","img"],R=["picture","img"];var N=a.forwardRef((function(e,t){const n=(0,y.A)({props:e,name:"MuiCardMedia"}),{children:r,className:a,component:o="div",image:i,src:s,style:l}=n,c=(0,d.A)(n,M),f=-1!==k.indexOf(o),A=!f&&i?(0,m.A)({backgroundImage:`url("${i}")`},l):l,g=(0,m.A)({},n,{component:o,isMediaComponent:f,isImageComponent:-1!==R.indexOf(o)}),h=(e=>{const{classes:t,isMediaComponent:n,isImageComponent:r}=e,a={root:["root",n&&"media",r&&"img"]};return(0,p.A)(a,w,t)})(g);return(0,v.jsx)(S,(0,m.A)({className:(0,u.A)(h.root,a),as:o,role:!f&&i?"img":void 0,ref:t,style:A,ownerState:g,src:f?i||s:void 0},c,{children:r}))}));function j(e){return(0,h.Ay)("MuiCardContent",e)}(0,g.A)("MuiCardContent",["root"]);const I=["className","component"],L=(0,f.Ay)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}})));var B=a.forwardRef((function(e,t){const n=(0,y.A)({props:e,name:"MuiCardContent"}),{className:r,component:a="div"}=n,o=(0,d.A)(n,I),i=(0,m.A)({},n,{component:a}),s=(e=>{const{classes:t}=e;return(0,p.A)({root:["root"]},j,t)})(i);return(0,v.jsx)(L,(0,m.A)({as:a,className:(0,u.A)(s.root,r),ownerState:i,ref:t},o))})),T=n(14073);function W(e){return(0,h.Ay)("MuiCardActions",e)}(0,g.A)("MuiCardActions",["root","spacing"]);const z=["disableSpacing","className"],G=(0,f.Ay)("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disableSpacing&&t.spacing]}})((({ownerState:e})=>(0,m.A)({display:"flex",alignItems:"center",padding:8},!e.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})));var D,F,O=a.forwardRef((function(e,t){const n=(0,y.A)({props:e,name:"MuiCardActions"}),{disableSpacing:r=!1,className:a}=n,o=(0,d.A)(n,z),i=(0,m.A)({},n,{disableSpacing:r}),s=(e=>{const{classes:t,disableSpacing:n}=e,r={root:["root",!n&&"spacing"]};return(0,p.A)(r,W,t)})(i);return(0,v.jsx)(G,(0,m.A)({className:(0,u.A)(s.root,a),ownerState:i,ref:t},o))})),P=n(61224),$=n(30995),_=n(44090),X=n(14650),H=n(36858),q=n(71479),U=n(58218);const Z=(0,q.A)(_.Ay)(D||(D=(0,r.A)(["\n  padding-right: 0;\n  padding-left: 0;\n"]))),J=(0,q.A)(P.A)(F||(F=(0,r.A)(["\n  display: block;\n  font-family: sans-serif;\n  font-style: normal;\n  font-weight: 300;\n  font-size: 14px;\n  color: #37293c;\n  text-align: center;\n  :hover {\n    text-decoration: underline;\n  }\n"])));var K=()=>a.createElement(o.A,null,a.createElement(i.A,{path:"",title:"Citation Creator / Generator",description:"Create citation online rapidly free for a wide range of CSL styles"}),a.createElement(s.Ay,{container:!0,height:"100%"},a.createElement(s.Ay,{bgcolor:"primary.main",container:!0,p:2,item:!0},a.createElement(s.Ay,{p:6,md:4,xs:12,item:!0},a.createElement(X.l5,null,"Create citation online rapidly free for a wide range of CSL styles"),a.createElement(X.S7,null,a.createElement(l.A,{disablePadding:!0},a.createElement(Z,null,a.createElement(c.A,{primary:"Create Citation Manually",secondary:"Create your citation manually rapidly for journals, books, websites, report"})),a.createElement(Z,null,a.createElement(c.A,{primary:"Import Citations",secondary:"Import citations from Title, URL, DOI, PubMed, ISBN, BibTeX"})),a.createElement(Z,null,a.createElement(c.A,{primary:"Export Citations",secondary:"Export your citations or references list to a PDF, Word, LaTex, BibTex Document"})),a.createElement(Z,null,a.createElement(c.A,{primary:"Store Citations",secondary:"Store citation in your browser to create your own references list"}))))),a.createElement(s.Ay,{container:!0,md:8,xs:12,item:!0,justifyContent:"center",p:4,height:{md:"80%"}},a.createElement(s.Ay,{item:!0,display:{md:"flex"},md:6,p:2},a.createElement(x,{sx:{maxWidth:{md:350,xs:150},bgcolor:"primary.50",borderRadius:"50px 50px 0 0"}},a.createElement(N,null,a.createElement(H.dX,null)),a.createElement(B,null,a.createElement(X.L1,null,"Bibliographies / References List"),a.createElement(T.A,{pt:2,pb:8,variant:"body2",color:"text.secondary"},"Create Bibliographies list from your citations or imported citations, also there an editor to help with editing list before exporting them")),a.createElement(O,null,a.createElement(P.A,{variant:"outlined",size:"small",href:"/citationsList/"},"List Generator")))),a.createElement(s.Ay,{item:!0,display:{md:"flex"},md:6,p:2},a.createElement(x,{sx:{maxWidth:{md:350,xs:150},bgcolor:"primary.50",borderRadius:"50px 50px 0 0"}},a.createElement(N,null,a.createElement(H.DH,null)),a.createElement(B,null,a.createElement(X.L1,null,"Reference Management"),a.createElement(T.A,{pt:2,variant:"body2",color:"text.secondary"},"Manage your references by organizing them in collections and tags. The goal of reference management is to make it easier for researchers to manage the information they use in their work and to generate accurate and consistent citations and bibliographies.")),a.createElement(O,null,a.createElement(P.A,{variant:"outlined",size:"small",href:"/referencesManager/"},"Manage References")))))),a.createElement(s.Ay,{bgcolor:"primary.light",container:!0,xs:12,item:!0},a.createElement(s.Ay,{md:7,p:6,item:!0},a.createElement($.A,{alignItems:"start",py:2},a.createElement(X.S7,null,"Generate Annotated Bibliography for:"),a.createElement($.A,{direction:"row"},Object.values(U.e$).map((e=>{let{id:t,label:n}=e;return a.createElement(J,{key:t,size:"small",href:"/"+t.toLowerCase()+"/"},n)}))))),a.createElement(s.Ay,{md:5,p:6,item:!0,container:!0,alignItems:"center",justifyContent:"center"},a.createElement(x,{sx:{bgcolor:"primary.50"}},a.createElement(B,null,a.createElement(X.S7,null,"How To Write Annotated Bibliography:"),a.createElement("ol",null,a.createElement("li",null,a.createElement(T.A,{variant:"body2"},"Write a brief summary of the source. This should include a few sentences that summarize the main ideas and arguments presented in the work. Be concise and focus on the most important points.")),a.createElement("li",null,a.createElement(T.A,{variant:"body2"},"Evaluate the source. Consider the credibility of the author and the quality of the information presented.")),a.createElement("li",null,a.createElement(T.A,{variant:"body2"},"Consider the audience. Think about who will be reading your annotated bibliography and what their interests and needs might be."))),a.createElement(T.A,{variant:"caption"},"Remember, an annotated bibliography is more than just a list of sources. It also includes a brief summary and evaluation of each source. By following these steps, you can create a well-written annotated bibliography that provides valuable information to your readers.")))))))}}]);
//# sourceMappingURL=component---src-pages-index-tsx-cdf551f7b84f0f68df7a.js.map