"use strict";(self.webpackChunkcitation_generator=self.webpackChunkcitation_generator||[]).push([[656],{70313:function(e,t,n){n.r(t),n.d(t,{default:function(){return q}});var r=n(67294),o=n(39211),a=n(85616),i=n(94382),c=n(49308),s=n(73085),l=n(5586),u=n(63366),f=n(87462),d=n(97326),h=n(94578),p=n(8812),m=n(15706),y=n.n(m);function v(e,t){if(!e){var n=new Error("loadable: "+t);throw n.framesToPop=1,n.name="Invariant Violation",n}}var g=r.createContext();var b={initialChunks:{}},E="PENDING",k="REJECTED";var C=function(e){return e};function R(e){var t=e.defaultResolveComponent,n=void 0===t?C:t,o=e.render,a=e.onLoad;function i(e,t){void 0===t&&(t={});var i=function(e){return"function"==typeof e?{requireAsync:e,resolve:function(){},chunkName:function(){}}:e}(e),c={};function s(e){return t.cacheKey?t.cacheKey(e):i.resolve?i.resolve(e):"static"}function l(e,r,o){var a=t.resolveComponent?t.resolveComponent(e,r):n(e);if(t.resolveComponent&&!(0,p.isValidElementType)(a))throw new Error("resolveComponent returned something that is not a React component!");return y()(o,a,{preload:!0}),a}var m,C,R=function(e){var t=s(e),n=c[t];return n&&n.status!==k||((n=i.requireAsync(e)).status=E,c[t]=n,n.then((function(){n.status="RESOLVED"}),(function(t){console.error("loadable-components: failed to asynchronously load component",{fileName:i.resolve(e),chunkName:i.chunkName(e),error:t?t.message:t}),n.status=k}))),n},w=function(e){function n(n){var r;return(r=e.call(this,n)||this).state={result:null,error:null,loading:!0,cacheKey:s(n)},v(!n.__chunkExtractor||i.requireSync,"SSR requires `@loadable/babel-plugin`, please install it"),n.__chunkExtractor?(!1===t.ssr||(i.requireAsync(n).catch((function(){return null})),r.loadSync(),n.__chunkExtractor.addChunk(i.chunkName(n))),(0,d.Z)(r)):(!1!==t.ssr&&(i.isReady&&i.isReady(n)||i.chunkName&&b.initialChunks[i.chunkName(n)])&&r.loadSync(),r)}(0,h.Z)(n,e),n.getDerivedStateFromProps=function(e,t){var n=s(e);return(0,f.Z)({},t,{cacheKey:n,loading:t.loading||t.cacheKey!==n})};var r=n.prototype;return r.componentDidMount=function(){this.mounted=!0;var e=this.getCache();e&&e.status===k&&this.setCache(),this.state.loading&&this.loadAsync()},r.componentDidUpdate=function(e,t){t.cacheKey!==this.state.cacheKey&&this.loadAsync()},r.componentWillUnmount=function(){this.mounted=!1},r.safeSetState=function(e,t){this.mounted&&this.setState(e,t)},r.getCacheKey=function(){return s(this.props)},r.getCache=function(){return c[this.getCacheKey()]},r.setCache=function(e){void 0===e&&(e=void 0),c[this.getCacheKey()]=e},r.triggerOnLoad=function(){var e=this;a&&setTimeout((function(){a(e.state.result,e.props)}))},r.loadSync=function(){if(this.state.loading)try{var e=l(i.requireSync(this.props),this.props,x);this.state.result=e,this.state.loading=!1}catch(t){console.error("loadable-components: failed to synchronously load component, which expected to be available",{fileName:i.resolve(this.props),chunkName:i.chunkName(this.props),error:t?t.message:t}),this.state.error=t}},r.loadAsync=function(){var e=this,t=this.resolveAsync();return t.then((function(t){var n=l(t,e.props,x);e.safeSetState({result:n,loading:!1},(function(){return e.triggerOnLoad()}))})).catch((function(t){return e.safeSetState({error:t,loading:!1})})),t},r.resolveAsync=function(){var e=this.props,t=(e.__chunkExtractor,e.forwardedRef,(0,u.Z)(e,["__chunkExtractor","forwardedRef"]));return R(t)},r.render=function(){var e=this.props,n=e.forwardedRef,r=e.fallback,a=(e.__chunkExtractor,(0,u.Z)(e,["forwardedRef","fallback","__chunkExtractor"])),i=this.state,c=i.error,s=i.loading,l=i.result;if(t.suspense&&(this.getCache()||this.loadAsync()).status===E)throw this.loadAsync();if(c)throw c;var d=r||t.fallback||null;return s?d:o({fallback:d,result:l,options:t,props:(0,f.Z)({},a,{ref:n})})},n}(r.Component),_=(C=function(e){return r.createElement(g.Consumer,null,(function(t){return r.createElement(m,Object.assign({__chunkExtractor:t},e))}))},(m=w).displayName&&(C.displayName=m.displayName+"WithChunkExtractor"),C),x=r.forwardRef((function(e,t){return r.createElement(_,Object.assign({forwardedRef:t},e))}));return x.displayName="Loadable",x.preload=function(e){x.load(e)},x.load=function(e){return R(e)},x}return{loadable:i,lazy:function(e,t){return i(e,(0,f.Z)({},t,{suspense:!0}))}}}var w=R({defaultResolveComponent:function(e){return e.__esModule?e.default:e.default||e},render:function(e){var t=e.result,n=e.props;return r.createElement(t,n)}}),_=w.loadable,x=w.lazy,N=R({onLoad:function(e,t){e&&t.forwardedRef&&("function"==typeof t.forwardedRef?t.forwardedRef(e):t.forwardedRef.current=e)},render:function(e){var t=e.result,n=e.props;return n.children?n.children(t):null}}),S=N.loadable,Z=N.lazy;var A=_;A.lib=S,x.lib=Z;var K=A,L=n(31371),B=n(35161),D=K((function(){return Promise.all([n.e(532),n.e(613),n.e(20)]).then(n.bind(n,14859))})),q=function(){return r.createElement(l.Z,null,r.createElement(s.Z,{title:"Reference List and Bibliography Generator"}),r.createElement(o.Z,{sx:{bgcolor:"background.paper",pt:8,pb:6}},r.createElement(a.Z,null,r.createElement(B.y,null,r.createElement(L.K,null,r.createElement(i.Z,{marginBottom:2},r.createElement(c.Z,{component:"h1",variant:"h5",align:"center",color:"text.primary",gutterBottom:!0,sx:{p:1}},"Reference List / Bibliography Generator"),r.createElement(c.Z,{textAlign:"center",color:"text.secondary",gutterBottom:!0},"Create your Reference or Bibliography with the ability to edit the list before exporting it to (PDF, Word, or BibTex)")),r.createElement(D,null))))))}}}]);
//# sourceMappingURL=component---src-pages-citations-list-tsx-19e480874f7a6cfcb2a7.js.map