"use strict";(self.webpackChunkcitation_generator=self.webpackChunkcitation_generator||[]).push([[26],{96540:function(e,t,n){var a=n(64836);t.Z=void 0;var l=a(n(64938)),r=n(85893),i=(0,l.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.Z=i},41899:function(e,t,n){var a=n(64836);t.Z=void 0;var l=a(n(64938)),r=n(85893),i=(0,l.default)((0,r.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"}),"ContentCopy");t.Z=i},27608:function(e,t,n){var a=n(64836);t.Z=void 0;var l=a(n(64938)),r=n(85893),i=(0,l.default)((0,r.jsx)("path",{d:"M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"}),"HelpOutline");t.Z=i},3295:function(e,t,n){n.d(t,{l0:function(){return re},ZP:function(){return ie}});var a,l=n(67294),r=n(15725),i=n(2658),c=n(76446),o=n(86089),s=n(32982),m=n(81880),u=n(15785),d=n(88699),p=n(44586),E=n(26447),f=n(47665),Z=n(56036),x=n(33797),v=n(45116),g=n(6867),b=n(72642),h=n(40476),y=n(41733),C=n(10932),k=n(89743),z=n(96540);const w=e=>({family:e.family,given:e.given,suffix:e.suffix}),I=(0,C.Z)(h.Z)(a||(a=(0,m.Z)(["\n  font-family: Noto Sans, sans-serif;\n  color: #161719;\n  font-size: 1em;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 22px;\n  display: flex;\n  align-items: center;\n  padding: 0;\n"])));var S=()=>{const{documentType:e,citation:t,setValue:n}=(0,l.useContext)(k.z),a=(0,l.useMemo)((()=>{const a=d.sK[e][0],l=[];return d.sK[e].map((e=>{t&&t[e]&&l.push.apply(l,(0,u.Z)(t[e].map((t=>({...t,role:e,id:(0,p.Z)()})))))})),l.length?l:(n(a,[{}]),[{role:a,id:(0,p.Z)()}])}),[e,t]),r=(0,l.useCallback)((()=>{const a=d.sK[e][0],l=t&&[].concat((0,u.Z)(t[a]),[{}])||[{}];n(a,(0,u.Z)(l))}),[e,t]),i=(0,l.useCallback)((e=>{const[t,l]=e.target.name.split("_"),r=e.target.id,i=e.target.value,c=a.filter((e=>e.role===l)).map((e=>e.id===t?{...w(e),[r]:i}:w(e)));n(l,c)}),[t,a]),s=(0,l.useCallback)((e=>{const[t,l]=e.currentTarget.name.split("_"),r=a.filter((e=>{if(e.role===l&&e.id!==t)return w(e)}));n(l,r)}),[a]),m=(0,l.useCallback)((e=>{const[t,l]=e.target.name.split("_"),r=e.target.value;let i;const c=a.filter((e=>{if(e.id===t&&(i=e),e.role===l&&e.id!==t)return w(e)})),o=a.filter((e=>e.role===r&&w(e)));n(l,c),n(r,[].concat((0,u.Z)(o),[i]))}),[a]);return l.createElement(o.Z,{disableGutters:!0},l.createElement(E.Z,{direction:"row",id:"author-container"},l.createElement(I,{id:"authors"},"Contributor(s)")),l.createElement(E.Z,{pt:2,pb:1,spacing:2},a.map(((t,n)=>l.createElement(E.Z,{id:t.id,key:n.toString(),spacing:{xs:1,md:2},direction:{xs:"column",md:"row"}},l.createElement(c.Z,{color:"secondary",size:"small",sx:{ml:0,minWidth:140}},l.createElement(f.Z,{sx:{fontSize:"small"}},"Contributor Role"),l.createElement(Z.Z,{label:"more source type",name:t.id+"_"+t.role,value:t.role,onChange:m},d.sK[e].map((e=>l.createElement(x.Z,{key:e,value:e},d.rC[e]))))),l.createElement(v.Z,{size:"small",name:t.id+"_"+t.role,id:"given",label:"First Name",focused:!1,value:t.given||"",inputProps:{className:"given"},onChange:i}),l.createElement(v.Z,{size:"small",name:t.id+"_"+t.role,id:"family",label:"Last Name",focused:!1,value:t.family||"",inputProps:{className:"family"},onChange:i}),l.createElement(v.Z,{size:"small",name:t.id+"_"+t.role,id:"suffix",label:"Suffix",focused:!1,value:t.suffix||"",inputProps:{className:"suffix"},onChange:i}),l.createElement(E.Z,{justifyContent:"center"},l.createElement(g.Z,{size:"small",title:"delete contributor",name:t.id+"_"+t.role,onClick:s,"aria-label":"delete"},l.createElement(y.Z,null))))))),l.createElement(o.Z,{disableGutters:!0},l.createElement(b.Z,{color:"success",size:"small","aria-label":"add",startIcon:l.createElement(z.Z,null),onClick:r},"Add Contributor")))},T=n(79332),j=n(21023),P=n(48999);const _=(0,C.Z)((e=>{let{className:t,...n}=e;return l.createElement(j.Z,Object.assign({},n,{classes:{popper:t}}),n.children)}))((()=>({["& ."+P.Z.tooltip]:{backgroundColor:"#f5f5f9",color:"rgba(0, 0, 0, 0.87)",maxWidth:220,fontSize:12,border:"1px solid #dadde9"}})));var D=n(27608),M=n(90948),N=n(58719);const W=(0,M.ZP)(N.ZP)((e=>{let{theme:t}=e;return{"label + &":{marginTop:t.spacing(1)},"& .MuiInputBase-input":{borderRadius:4,position:"relative",border:"1px solid #646b81",fontSize:16,padding:"4px 12px",transition:"unset","&:focus":{border:"2px solid #161719"}}}})),O=(0,M.ZP)(h.Z)((()=>({fontFamily:"Noto Sans, sans-serif",color:"#161719",fontSize:"1em",fontStyle:"normal",fontWeight:600,lineHeight:"22px"})));var V=e=>{let{id:t,required:n,multiline:a}=e;const{setValue:r,citation:i}=(0,l.useContext)(k.z),o=(0,l.useCallback)((e=>{const{id:t,value:n}=e.target;r(t,n)}),[]),s=i[t]||"";return l.createElement(c.Z,{fullWidth:!0,variant:"standard"},l.createElement(O,{focused:!1},d.p8[t],l.createElement(_,{title:d.T4[t]},l.createElement(D.Z,{fontSize:"16",sx:{margin:"-4px 4px"}}))),l.createElement(W,{onChange:o,value:s,required:n,multiline:"note"===t,minRows:3,fullWidth:!0,id:t}))};var F=e=>{var t;let{id:n}=e;const{documentType:a,setValue:r,citation:i}=(0,l.useContext)(k.z),s=i&&(null===(t=i[n])||void 0===t?void 0:t["date-parts"])||["0","0","0"],[m,u,p]=s,Z=(0,l.useCallback)((async e=>{switch(e.target.id){case n+"-day":s[2]=e.target.value;break;case n+"-month":s[1]=e.target.value;break;case n+"-year":s[0]=e.target.value}r(n,{"date-parts":s})}),[n,r,s]);return l.createElement(o.Z,{disableGutters:!0,sx:{pt:"4px",display:"flex",flexDirection:"column"}},l.createElement(O,{focused:!1},d.p8[n],l.createElement(_,{title:d.T4.issued},l.createElement(D.Z,{fontSize:"16",sx:{margin:"-4px 4px"}}))),l.createElement(E.Z,{direction:"row",spacing:1},"website"===a&&l.createElement(l.Fragment,null,l.createElement(c.Z,{variant:"standard"},l.createElement(f.Z,{focused:!1,shrink:!0},"Day"),l.createElement(T.Z,{value:"0"===p?"":p,onChange:Z,type:"number",id:n+"-day"})),l.createElement(c.Z,{variant:"standard"},l.createElement(f.Z,{focused:!1,shrink:!0},"Month"),l.createElement(T.Z,{value:"0"===u?"":u,onChange:Z,type:"number",id:n+"-month"}))),l.createElement(c.Z,{variant:"standard"},l.createElement(f.Z,{focused:!1,shrink:!0},"Year"),l.createElement(T.Z,{value:"0"===m?"":m,onChange:Z,type:"number",id:n+"-year"}))))},H=n(15723),L=n(33382);var R=()=>{const{citation:e,setValue:t}=(0,l.useContext)(k.z),{0:n,1:a}=(0,l.useState)("DOI"),r=(0,l.useCallback)(((e,t)=>a(t)),[]),i=(0,l.useCallback)((e=>{t(n,e.target.value)}),[n]),o=e[n]||"";return l.createElement(E.Z,{py:1},l.createElement(O,{focused:!1},"Link"),l.createElement(E.Z,{direction:{xs:"column",md:"row"}},l.createElement(H.Z,{size:"small",exclusive:!0,value:n,onChange:r},l.createElement(L.Z,{value:"DOI"},"DOI"),l.createElement(L.Z,{value:"URL"},"URL")),l.createElement(c.Z,{size:"small",variant:"standard",sx:{margin:"0 12px",flex:1}},l.createElement(f.Z,{focused:!1,shrink:!0},n),l.createElement(T.Z,{id:"link",fullWidth:!0,onChange:i,value:o}))))},K=n(24213),A=n(8044),G=n(68409),B=n(94834),U=n(27305),q=n(33654);var $=()=>{const{copyOption:e,setCopyOption:t,citation:n,documentType:a}=(0,l.useContext)(k.z),c=(0,l.useCallback)((()=>{(0,q.i)(n,a)||(0,B.k)([{...n,type:a}])}),[n,a]),o=(0,l.useCallback)(((e,n)=>{n&&t(n)}),[]);return l.createElement(r.ZP,{item:!0,xs:11,lg:12,p:{xs:1,md:2},container:!0,flexWrap:"wrap",justifyContent:{xs:"center",md:"space-between"},bgcolor:"#F4F3F5"},l.createElement(E.Z,null,l.createElement(G.Z,null),l.createElement(i.Z,{variant:"caption",align:"center",p:1},"Document Type")),l.createElement(E.Z,{alignItems:"center"},l.createElement(A.Z,{sx:{flexWrap:"wrap"},size:"small"},l.createElement(b.Z,{startIcon:l.createElement(U.K,null),size:"small",variant:"text",color:"secondary",onClick:c},"export to word .xml")),l.createElement(i.Z,{variant:"caption",align:"center",p:1},"Import your citation to Microsoft Word")),l.createElement(E.Z,null,l.createElement(H.Z,{sx:{flexWrap:"wrap",justifyContent:"center"},value:e,onChange:o,size:"small",exclusive:!0},l.createElement(L.Z,{value:"text"},"Plain-text"),l.createElement(L.Z,{value:"bibitem"},"LaTex-bibitem"),l.createElement(L.Z,{value:"bibtex"},"Bibtex"),l.createElement(L.Z,{value:"ris"},"Ris")),l.createElement(i.Z,{variant:"caption",align:"center",p:1},"Copy Option")))},Y=n(64680),J=n(71508),Q=n(97608),X=n(52288),ee=n(41899),te=n(90533),ne=n(16010);var ae=()=>{const{showAlert:e,handleClick:t,handleClose:n}=(0,te.V)(),{citation:a,style:r,xml:c,documentType:o,copyOption:s}=(0,l.useContext)(k.z),{convertedCitation:m,inText:u}=(0,l.useMemo)((()=>(0,ne.$$)(a,o,"html",r,c)),[a,o,r]);return(0,l.useMemo)((()=>(0,q.i)(a,o)),[a])?l.createElement(l.Fragment,null):l.createElement(l.Fragment,null,l.createElement(Y.Z,{elevation:4,sx:{my:1}},l.createElement(J.Z,{sx:{display:"flex",padding:"8px",alignItems:"center"}},l.createElement(g.Z,{onClick:t,value:"citation",sx:{flexDirection:"column"}},l.createElement(ee.Z,null),l.createElement(i.Z,{variant:"caption"},"Copy")),l.createElement("div",{className:"output-viewer",dangerouslySetInnerHTML:{__html:m}})),"text"===s&&l.createElement(J.Z,{sx:{display:"flex",padding:"8px",alignItems:"center"}},l.createElement(g.Z,{onClick:t,value:"in-text",sx:{flexDirection:"column"}},l.createElement(ee.Z,null),l.createElement(i.Z,{variant:"caption"},"Copy")),l.createElement(J.Z,null,l.createElement(i.Z,{variant:"caption",color:"text.secondary",padding:0},"In text citation:"),l.createElement("div",{className:"output-viewer",dangerouslySetInnerHTML:{__html:u}})))),l.createElement(Q.Z,{open:e,autoHideDuration:2e3,onClose:n},l.createElement(X.Z,{onClose:n,severity:"success",sx:{width:"100%"}},"Citation Copied to clipboard")))};const le={"article-journal":["abstract","shortTitle","journalAbbreviation","language","ISSN","accessed","source","call-number","note"],book:["abstract","collection-title","collection-number","number-of-volumes","publisher-place","number-of-pages","language","ISBN","source","accessed","call-number","note"],webpage:["abstract","publisher-place","language","source","accessed","call-number","note"],report:["abstract","language","note","source","accessed","call-number"]},re=()=>{const{documentType:e,note:t}=(0,l.useContext)(k.z),n=(0,l.useMemo)((()=>"article-journal"===e||"book"===e||"webpage"===e||"report"===e?d.mn[e].filter((n=>{if(t&&"note"===n)return n;if(!le[e].includes(n)){if("DOI"===n&&"article-journal"===e)return n;if("URL"!==n||"article-journal"!==e)return n}})):d.mn[e]),[e,t]);return l.createElement(r.ZP,{container:!0,justifyContent:"center",item:!0},l.createElement(r.ZP,{item:!0,xs:8,md:10,container:!0},l.createElement(c.Z,{fullWidth:!0,component:"form"},n.map(((e,t)=>l.createElement(r.ZP,{item:!0,xs:12,py:1,key:t.toString()},{issued:l.createElement(F,{id:e}),accessed:l.createElement(F,{id:e}),DOI:l.createElement(R,null),contributors:l.createElement(S,null)}[e]||l.createElement(V,{id:e})))))),l.createElement(r.ZP,{item:!0,container:!0,direction:"column",alignItems:"center",xs:2,md:2},l.createElement(o.Z,{disableGutters:!0,sx:{display:"flex",alignItems:"end",flexDirection:"column",top:0,bottom:0,position:"sticky",pl:"6px",pt:"32px"}},l.createElement(s.K2,null),l.createElement(s.V1,null))))};var ie=()=>{const{documentType:e,style:t,note:n,xml:a,reset:c}=(0,l.useContext)(k.z),o=(0,l.useCallback)((e=>c(e)),[]);return l.createElement(r.ZP,{container:!0,direction:"column",justifyContent:"center",id:"form-container"},l.createElement($,null),l.createElement(ae,null),l.createElement(i.Z,{py:1,textAlign:{xs:"center",md:"start"},variant:"subtitle2",fontWeight:"500"},"Fill entry to generate citation manually on the fly or Import citation from an external source"),l.createElement(K.R,{documentType:e,style:n?"annotation/"+t:t,xml:a,updateCitation:o}),l.createElement(re,null))}}}]);
//# sourceMappingURL=7e9e11aa9ad5ae92d2dd863d58c5b912194e1b8f-4c8ab53788a559ac7e0b.js.map