(self.webpackChunkcitation_generator=self.webpackChunkcitation_generator||[]).push([[223],{18828:function(t){"use strict";t.exports=Object.assign},78818:function(t,e,n){"use strict";var r=n(96540),o=n(68154),i=n(24794);e.A=t=>{var e;let{description:n,lang:a,title:c,path:u}=t;const{site:s}=(0,i.useStaticQuery)("63159454"),f=n||s.siteMetadata.description,l=null===(e=s.siteMetadata)||void 0===e?void 0:e.title;return r.createElement(o.m,{htmlAttributes:{lang:a},title:c,titleTemplate:l?"%s":l,meta:[{name:"description",content:f},{property:"og:title",content:c},{property:"og:description",content:f},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:f},{name:"twitter:title",content:c},{name:"twitter:description",content:f},{"http-equiv":"refresh",content:"0; url=https://citation-generator.pages.dev/"+u}]})}},30115:function(t){var e="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(t,a){if(t===a)return!0;if(t&&a&&"object"==typeof t&&"object"==typeof a){if(t.constructor!==a.constructor)return!1;var c,u,s,f;if(Array.isArray(t)){if((c=t.length)!=a.length)return!1;for(u=c;0!=u--;)if(!i(t[u],a[u]))return!1;return!0}if(n&&t instanceof Map&&a instanceof Map){if(t.size!==a.size)return!1;for(f=t.entries();!(u=f.next()).done;)if(!a.has(u.value[0]))return!1;for(f=t.entries();!(u=f.next()).done;)if(!i(u.value[1],a.get(u.value[0])))return!1;return!0}if(r&&t instanceof Set&&a instanceof Set){if(t.size!==a.size)return!1;for(f=t.entries();!(u=f.next()).done;)if(!a.has(u.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(a)){if((c=t.length)!=a.length)return!1;for(u=c;0!=u--;)if(t[u]!==a[u])return!1;return!0}if(t.constructor===RegExp)return t.source===a.source&&t.flags===a.flags;if(t.valueOf!==Object.prototype.valueOf&&"function"==typeof t.valueOf&&"function"==typeof a.valueOf)return t.valueOf()===a.valueOf();if(t.toString!==Object.prototype.toString&&"function"==typeof t.toString&&"function"==typeof a.toString)return t.toString()===a.toString();if((c=(s=Object.keys(t)).length)!==Object.keys(a).length)return!1;for(u=c;0!=u--;)if(!Object.prototype.hasOwnProperty.call(a,s[u]))return!1;if(e&&t instanceof Element)return!1;for(u=c;0!=u--;)if(("_owner"!==s[u]&&"__v"!==s[u]&&"__o"!==s[u]||!t.$$typeof)&&!i(t[s[u]],a[s[u]]))return!1;return!0}return t!=t&&a!=a}t.exports=function(t,e){try{return i(t,e)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},68154:function(t,e,n){"use strict";n.d(e,{m:function(){return dt}});var r,o,i,a,c=n(5556),u=n.n(c),s=n(52098),f=n.n(s),l=n(30115),p=n.n(l),d=n(96540),y=n(18828),h=n.n(y),m="bodyAttributes",b="htmlAttributes",T="titleAttributes",g={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},v=(Object.keys(g).map((function(t){return g[t]})),"charset"),w="cssText",A="href",O="http-equiv",C="innerHTML",S="itemprop",E="name",j="property",k="rel",P="src",L="target",x={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},I="defaultTitle",M="defer",N="encodeSpecialCharacters",R="onChangeClientState",_="titleTemplate",q=Object.keys(x).reduce((function(t,e){return t[x[e]]=e,t}),{}),B=[g.NOSCRIPT,g.SCRIPT,g.STYLE],D="data-react-helmet",H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Y=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),F=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},U=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},z=function(t){return!1===(!(arguments.length>1&&void 0!==arguments[1])||arguments[1])?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},K=function(t){var e=G(t,g.TITLE),n=G(t,_);if(n&&e)return n.replace(/%s/g,(function(){return Array.isArray(e)?e.join(""):e}));var r=G(t,I);return e||r||void 0},V=function(t){return G(t,R)||function(){}},W=function(t,e){return e.filter((function(e){return void 0!==e[t]})).map((function(e){return e[t]})).reduce((function(t,e){return F({},t,e)}),{})},$=function(t,e){return e.filter((function(t){return void 0!==t[g.BASE]})).map((function(t){return t[g.BASE]})).reverse().reduce((function(e,n){if(!e.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o].toLowerCase();if(-1!==t.indexOf(i)&&n[i])return e.concat(n)}return e}),[])},Q=function(t,e,n){var r={};return n.filter((function(e){return!!Array.isArray(e[t])||(void 0!==e[t]&&et("Helmet: "+t+' should be of type "Array". Instead found type "'+H(e[t])+'"'),!1)})).map((function(e){return e[t]})).reverse().reduce((function(t,n){var o={};n.filter((function(t){for(var n=void 0,i=Object.keys(t),a=0;a<i.length;a++){var c=i[a],u=c.toLowerCase();-1===e.indexOf(u)||n===k&&"canonical"===t[n].toLowerCase()||u===k&&"stylesheet"===t[u].toLowerCase()||(n=u),-1===e.indexOf(c)||c!==C&&c!==w&&c!==S||(n=c)}if(!n||!t[n])return!1;var s=t[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][s]&&(o[n][s]=!0,!0)})).reverse().forEach((function(e){return t.push(e)}));for(var i=Object.keys(o),a=0;a<i.length;a++){var c=i[a],u=h()({},r[c],o[c]);r[c]=u}return t}),[]).reverse()},G=function(t,e){for(var n=t.length-1;n>=0;n--){var r=t[n];if(r.hasOwnProperty(e))return r[e]}return null},J=(r=Date.now(),function(t){var e=Date.now();e-r>16?(r=e,t(e)):setTimeout((function(){J(t)}),0)}),X=function(t){return clearTimeout(t)},Z="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||J:n.g.requestAnimationFrame||J,tt="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||X:n.g.cancelAnimationFrame||X,et=function(t){return console&&"function"==typeof console.warn&&console.warn(t)},nt=null,rt=function(t,e){var n=t.baseTag,r=t.bodyAttributes,o=t.htmlAttributes,i=t.linkTags,a=t.metaTags,c=t.noscriptTags,u=t.onChangeClientState,s=t.scriptTags,f=t.styleTags,l=t.title,p=t.titleAttributes;at(g.BODY,r),at(g.HTML,o),it(l,p);var d={baseTag:ct(g.BASE,n),linkTags:ct(g.LINK,i),metaTags:ct(g.META,a),noscriptTags:ct(g.NOSCRIPT,c),scriptTags:ct(g.SCRIPT,s),styleTags:ct(g.STYLE,f)},y={},h={};Object.keys(d).forEach((function(t){var e=d[t],n=e.newTags,r=e.oldTags;n.length&&(y[t]=n),r.length&&(h[t]=d[t].oldTags)})),e&&e(),u(t,y,h)},ot=function(t){return Array.isArray(t)?t.join(""):t},it=function(t,e){void 0!==t&&document.title!==t&&(document.title=ot(t)),at(g.TITLE,e)},at=function(t,e){var n=document.getElementsByTagName(t)[0];if(n){for(var r=n.getAttribute(D),o=r?r.split(","):[],i=[].concat(o),a=Object.keys(e),c=0;c<a.length;c++){var u=a[c],s=e[u]||"";n.getAttribute(u)!==s&&n.setAttribute(u,s),-1===o.indexOf(u)&&o.push(u);var f=i.indexOf(u);-1!==f&&i.splice(f,1)}for(var l=i.length-1;l>=0;l--)n.removeAttribute(i[l]);o.length===i.length?n.removeAttribute(D):n.getAttribute(D)!==a.join(",")&&n.setAttribute(D,a.join(","))}},ct=function(t,e){var n=document.head||document.querySelector(g.HEAD),r=n.querySelectorAll(t+"["+D+"]"),o=Array.prototype.slice.call(r),i=[],a=void 0;return e&&e.length&&e.forEach((function(e){var n=document.createElement(t);for(var r in e)if(e.hasOwnProperty(r))if(r===C)n.innerHTML=e.innerHTML;else if(r===w)n.styleSheet?n.styleSheet.cssText=e.cssText:n.appendChild(document.createTextNode(e.cssText));else{var c=void 0===e[r]?"":e[r];n.setAttribute(r,c)}n.setAttribute(D,"true"),o.some((function(t,e){return a=e,n.isEqualNode(t)}))?o.splice(a,1):i.push(n)})),o.forEach((function(t){return t.parentNode.removeChild(t)})),i.forEach((function(t){return n.appendChild(t)})),{oldTags:o,newTags:i}},ut=function(t){return Object.keys(t).reduce((function(e,n){var r=void 0!==t[n]?n+'="'+t[n]+'"':""+n;return e?e+" "+r:r}),"")},st=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,n){return e[x[n]||n]=t[n],e}),e)},ft=function(t,e,n){switch(t){case g.TITLE:return{toComponent:function(){return t=e.title,n=e.titleAttributes,(r={key:t})[D]=!0,o=st(n,r),[d.createElement(g.TITLE,o,t)];var t,n,r,o},toString:function(){return function(t,e,n,r){var o=ut(n),i=ot(e);return o?"<"+t+" "+D+'="true" '+o+">"+z(i,r)+"</"+t+">":"<"+t+" "+D+'="true">'+z(i,r)+"</"+t+">"}(t,e.title,e.titleAttributes,n)}};case m:case b:return{toComponent:function(){return st(e)},toString:function(){return ut(e)}};default:return{toComponent:function(){return function(t,e){return e.map((function(e,n){var r,o=((r={key:n})[D]=!0,r);return Object.keys(e).forEach((function(t){var n=x[t]||t;if(n===C||n===w){var r=e.innerHTML||e.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=e[t]})),d.createElement(t,o)}))}(t,e)},toString:function(){return function(t,e,n){return e.reduce((function(e,r){var o=Object.keys(r).filter((function(t){return!(t===C||t===w)})).reduce((function(t,e){var o=void 0===r[e]?e:e+'="'+z(r[e],n)+'"';return t?t+" "+o:o}),""),i=r.innerHTML||r.cssText||"",a=-1===B.indexOf(t);return e+"<"+t+" "+D+'="true" '+o+(a?"/>":">"+i+"</"+t+">")}),"")}(t,e,n)}}}},lt=function(t){var e=t.baseTag,n=t.bodyAttributes,r=t.encode,o=t.htmlAttributes,i=t.linkTags,a=t.metaTags,c=t.noscriptTags,u=t.scriptTags,s=t.styleTags,f=t.title,l=void 0===f?"":f,p=t.titleAttributes;return{base:ft(g.BASE,e,r),bodyAttributes:ft(m,n,r),htmlAttributes:ft(b,o,r),link:ft(g.LINK,i,r),meta:ft(g.META,a,r),noscript:ft(g.NOSCRIPT,c,r),script:ft(g.SCRIPT,u,r),style:ft(g.STYLE,s,r),title:ft(g.TITLE,{title:l,titleAttributes:p},r)}},pt=f()((function(t){return{baseTag:$([A,L],t),bodyAttributes:W(m,t),defer:G(t,M),encode:G(t,N),htmlAttributes:W(b,t),linkTags:Q(g.LINK,[k,A],t),metaTags:Q(g.META,[E,v,O,j,S],t),noscriptTags:Q(g.NOSCRIPT,[C],t),onChangeClientState:V(t),scriptTags:Q(g.SCRIPT,[P,C],t),styleTags:Q(g.STYLE,[w],t),title:K(t),titleAttributes:W(T,t)}}),(function(t){nt&&tt(nt),t.defer?nt=Z((function(){rt(t,(function(){nt=null}))})):(rt(t),nt=null)}),lt)((function(){return null})),dt=(o=pt,a=i=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.shouldComponentUpdate=function(t){return!p()(this.props,t)},e.prototype.mapNestedChildrenToProps=function(t,e){if(!e)return null;switch(t.type){case g.SCRIPT:case g.NOSCRIPT:return{innerHTML:e};case g.STYLE:return{cssText:e}}throw new Error("<"+t.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},e.prototype.flattenArrayTypeChildren=function(t){var e,n=t.child,r=t.arrayTypeChildren,o=t.newChildProps,i=t.nestedChildren;return F({},r,((e={})[n.type]=[].concat(r[n.type]||[],[F({},o,this.mapNestedChildrenToProps(n,i))]),e))},e.prototype.mapObjectTypeChildren=function(t){var e,n,r=t.child,o=t.newProps,i=t.newChildProps,a=t.nestedChildren;switch(r.type){case g.TITLE:return F({},o,((e={})[r.type]=a,e.titleAttributes=F({},i),e));case g.BODY:return F({},o,{bodyAttributes:F({},i)});case g.HTML:return F({},o,{htmlAttributes:F({},i)})}return F({},o,((n={})[r.type]=F({},i),n))},e.prototype.mapArrayTypeChildrenToProps=function(t,e){var n=F({},e);return Object.keys(t).forEach((function(e){var r;n=F({},n,((r={})[e]=t[e],r))})),n},e.prototype.warnOnInvalidChildren=function(t,e){return!0},e.prototype.mapChildrenToProps=function(t,e){var n=this,r={};return d.Children.forEach(t,(function(t){if(t&&t.props){var o=t.props,i=o.children,a=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,n){return e[q[n]||n]=t[n],e}),e)}(U(o,["children"]));switch(n.warnOnInvalidChildren(t,i),t.type){case g.LINK:case g.META:case g.NOSCRIPT:case g.SCRIPT:case g.STYLE:r=n.flattenArrayTypeChildren({child:t,arrayTypeChildren:r,newChildProps:a,nestedChildren:i});break;default:e=n.mapObjectTypeChildren({child:t,newProps:e,newChildProps:a,nestedChildren:i})}}})),e=this.mapArrayTypeChildrenToProps(r,e)},e.prototype.render=function(){var t=this.props,e=t.children,n=U(t,["children"]),r=F({},n);return e&&(r=this.mapChildrenToProps(e,r)),d.createElement(o,r)},Y(e,null,[{key:"canUseDOM",set:function(t){o.canUseDOM=t}}]),e}(d.Component),i.propTypes={base:u().object,bodyAttributes:u().object,children:u().oneOfType([u().arrayOf(u().node),u().node]),defaultTitle:u().string,defer:u().bool,encodeSpecialCharacters:u().bool,htmlAttributes:u().object,link:u().arrayOf(u().object),meta:u().arrayOf(u().object),noscript:u().arrayOf(u().object),onChangeClientState:u().func,script:u().arrayOf(u().object),style:u().arrayOf(u().object),title:u().string,titleAttributes:u().object,titleTemplate:u().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var t=o.rewind();return t||(t=lt({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},a);dt.renderStatic=dt.rewind},52098:function(t,e,n){"use strict";var r,o=n(96540),i=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);t.exports=function(t,e,n){if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof e)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var u,s=[];function f(){u=t(s.map((function(t){return t.props}))),l.canUseDOM?e(u):n&&(u=n(u))}var l=function(t){var e,n;function o(){return t.apply(this,arguments)||this}n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n,o.peek=function(){return u},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var t=u;return u=void 0,s=[],t};var a=o.prototype;return a.UNSAFE_componentWillMount=function(){s.push(this),f()},a.componentDidUpdate=function(){f()},a.componentWillUnmount=function(){var t=s.indexOf(this);s.splice(t,1),f()},a.render=function(){return i.createElement(r,this.props)},o}(o.PureComponent);return a(l,"displayName","SideEffect("+function(t){return t.displayName||t.name||"Component"}(r)+")"),a(l,"canUseDOM",c),l}}}}]);
//# sourceMappingURL=commons-5214d3aa5f7daa764202.js.map