(self.webpackChunkcitation_generator=self.webpackChunkcitation_generator||[]).push([[340],{2757:function(t,e,r){var n;window,t.exports=(n=r(7294),function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=12)}([function(t,e,r){"use strict";var n=r(4),o="object"==typeof self&&self&&self.Object===Object&&self,i=n.a||o||Function("return this")();e.a=i},function(t,e,r){t.exports=r(9)()},function(t,r,n){"use strict";(function(t){var o=n(4),i=e&&!e.nodeType&&e,a=i&&"object"==typeof t&&t&&!t.nodeType&&t,s=a&&a.exports===i&&o.a.process,c=function(){try{return a&&a.require&&a.require("util").types||s&&s.binding&&s.binding("util")}catch(t){}}();r.a=c}).call(this,n(6)(t))},function(t,e){t.exports=n},function(t,e,r){"use strict";(function(t){var r="object"==typeof t&&t&&t.Object===Object&&t;e.a=r}).call(this,r(11))},function(t,r,n){"use strict";(function(t){var o=n(0),i=n(7),a=e&&!e.nodeType&&e,s=a&&"object"==typeof t&&t&&!t.nodeType&&t,c=s&&s.exports===a?o.a.Buffer:void 0,u=(c?c.isBuffer:void 0)||i.a;r.a=u}).call(this,n(6)(t))},function(t,e){t.exports=function(t){if(!t.webpackPolyfill){var e=Object.create(t);e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),Object.defineProperty(e,"exports",{enumerable:!0}),e.webpackPolyfill=1}return e}},function(t,e,r){"use strict";e.a=function(){return!1}},function(t,r,n){"use strict";(function(t){var o=n(0),i=e&&!e.nodeType&&e,a=i&&"object"==typeof t&&t&&!t.nodeType&&t,s=a&&a.exports===i?o.a.Buffer:void 0,c=s?s.allocUnsafe:void 0;r.a=function(t,e){if(e)return t.slice();var r=t.length,n=c?c(r):new t.constructor(r);return t.copy(n),n}}).call(this,n(6)(t))},function(t,e,r){"use strict";var n=r(10);function o(){}function i(){}i.resetWarningCache=o,t.exports=function(){function t(t,e,r,o,i,a){if(a!==n){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function e(){return t}t.isRequired=t;var r={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:i,resetWarningCache:o};return r.PropTypes=r,r}},function(t,e,r){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";r.r(e),r.d(e,"CKEditor",(function(){return Sr})),r.d(e,"CKEditorContext",(function(){return Rr}));var n=r(3),o=r.n(n),i=r(1),a=r.n(i),s=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},c=r(0),u=function(){return c.a.Date.now()},h=/\s/,l=function(t){for(var e=t.length;e--&&h.test(t.charAt(e)););return e},d=/^\s+/,f=function(t){return t?t.slice(0,l(t)+1).replace(d,""):t},p=c.a.Symbol,y=Object.prototype,_=y.hasOwnProperty,m=y.toString,g=p?p.toStringTag:void 0,b=function(t){var e=_.call(t,g),r=t[g];try{t[g]=void 0;var n=!0}catch(t){}var o=m.call(t);return n&&(e?t[g]=r:delete t[g]),o},v=Object.prototype.toString,j=function(t){return v.call(t)},w=p?p.toStringTag:void 0,x=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":w&&w in Object(t)?b(t):j(t)},E=function(t){return null!=t&&"object"==typeof t},C=function(t){return"symbol"==typeof t||E(t)&&"[object Symbol]"==x(t)},O=/^[-+]0x[0-9a-f]+$/i,P=/^0b[01]+$/i,A=/^0o[0-7]+$/i,T=parseInt,W=function(t){if("number"==typeof t)return t;if(C(t))return NaN;if(s(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=s(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=f(t);var r=P.test(t);return r||A.test(t)?T(t.slice(2),r?2:8):O.test(t)?NaN:+t},R=Math.max,S=Math.min,D=function(t,e,r){var n,o,i,a,c,h,l=0,d=!1,f=!1,p=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function y(e){var r=n,i=o;return n=o=void 0,l=e,a=t.apply(i,r)}function _(t){return l=t,c=setTimeout(g,e),d?y(t):a}function m(t){var r=t-h;return void 0===h||r>=e||r<0||f&&t-l>=i}function g(){var t=u();if(m(t))return b(t);c=setTimeout(g,function(t){var r=e-(t-h);return f?S(r,i-(t-l)):r}(t))}function b(t){return c=void 0,p&&n?y(t):(n=o=void 0,a)}function v(){var t=u(),r=m(t);if(n=arguments,o=this,h=t,r){if(void 0===c)return _(h);if(f)return clearTimeout(c),c=setTimeout(g,e),y(h)}return void 0===c&&(c=setTimeout(g,e)),a}return e=W(e)||0,s(r)&&(d=!!r.leading,i=(f="maxWait"in r)?R(W(r.maxWait)||0,e):i,p="trailing"in r?!!r.trailing:p),v.cancel=function(){void 0!==c&&clearTimeout(c),l=0,n=h=o=c=void 0},v.flush=function(){return void 0===c?a:b(u())},v},Z=function(t,e,r){var n=!0,o=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return s(r)&&(n="leading"in r?!!r.leading:n,o="trailing"in r?!!r.trailing:o),D(t,e,{leading:n,maxWait:e,trailing:o})},I=function(){this.__data__=[],this.size=0},M=function(t,e){return t===e||t!=t&&e!=e},z=function(t,e){for(var r=t.length;r--;)if(M(t[r][0],e))return r;return-1},k=Array.prototype.splice,N=function(t){var e=this.__data__,r=z(e,t);return!(r<0||(r==e.length-1?e.pop():k.call(e,r,1),--this.size,0))},U=function(t){var e=this.__data__,r=z(e,t);return r<0?void 0:e[r][1]},F=function(t){return z(this.__data__,t)>-1},L=function(t,e){var r=this.__data__,n=z(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this};function B(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}B.prototype.clear=I,B.prototype.delete=N,B.prototype.get=U,B.prototype.has=F,B.prototype.set=L;var $,H=B,Q=function(){this.__data__=new H,this.size=0},q=function(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r},V=function(t){return this.__data__.get(t)},K=function(t){return this.__data__.has(t)},Y=function(t){if(!s(t))return!1;var e=x(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e},G=c.a["__core-js_shared__"],X=($=/[^.]+$/.exec(G&&G.keys&&G.keys.IE_PROTO||""))?"Symbol(src)_1."+$:"",J=function(t){return!!X&&X in t},tt=Function.prototype.toString,et=function(t){if(null!=t){try{return tt.call(t)}catch(t){}try{return t+""}catch(t){}}return""},rt=/^\[object .+?Constructor\]$/,nt=Function.prototype,ot=Object.prototype,it=nt.toString,at=ot.hasOwnProperty,st=RegExp("^"+it.call(at).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ct=function(t){return!(!s(t)||J(t))&&(Y(t)?st:rt).test(et(t))},ut=function(t,e){return null==t?void 0:t[e]},ht=function(t,e){var r=ut(t,e);return ct(r)?r:void 0},lt=ht(c.a,"Map"),dt=ht(Object,"create"),ft=function(){this.__data__=dt?dt(null):{},this.size=0},pt=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},yt=Object.prototype.hasOwnProperty,_t=function(t){var e=this.__data__;if(dt){var r=e[t];return"__lodash_hash_undefined__"===r?void 0:r}return yt.call(e,t)?e[t]:void 0},mt=Object.prototype.hasOwnProperty,gt=function(t){var e=this.__data__;return dt?void 0!==e[t]:mt.call(e,t)},bt=function(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=dt&&void 0===e?"__lodash_hash_undefined__":e,this};function vt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}vt.prototype.clear=ft,vt.prototype.delete=pt,vt.prototype.get=_t,vt.prototype.has=gt,vt.prototype.set=bt;var jt=vt,wt=function(){this.size=0,this.__data__={hash:new jt,map:new(lt||H),string:new jt}},xt=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t},Et=function(t,e){var r=t.__data__;return xt(e)?r["string"==typeof e?"string":"hash"]:r.map},Ct=function(t){var e=Et(this,t).delete(t);return this.size-=e?1:0,e},Ot=function(t){return Et(this,t).get(t)},Pt=function(t){return Et(this,t).has(t)},At=function(t,e){var r=Et(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this};function Tt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Tt.prototype.clear=wt,Tt.prototype.delete=Ct,Tt.prototype.get=Ot,Tt.prototype.has=Pt,Tt.prototype.set=At;var Wt=Tt,Rt=function(t,e){var r=this.__data__;if(r instanceof H){var n=r.__data__;if(!lt||n.length<199)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Wt(n)}return r.set(t,e),this.size=r.size,this};function St(t){var e=this.__data__=new H(t);this.size=e.size}St.prototype.clear=Q,St.prototype.delete=q,St.prototype.get=V,St.prototype.has=K,St.prototype.set=Rt;var Dt=St,Zt=function(t,e){for(var r=-1,n=null==t?0:t.length;++r<n&&!1!==e(t[r],r,t););return t},It=function(){try{var t=ht(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),Mt=function(t,e,r){"__proto__"==e&&It?It(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r},zt=Object.prototype.hasOwnProperty,kt=function(t,e,r){var n=t[e];zt.call(t,e)&&M(n,r)&&(void 0!==r||e in t)||Mt(t,e,r)},Nt=function(t,e,r,n){var o=!r;r||(r={});for(var i=-1,a=e.length;++i<a;){var s=e[i],c=n?n(r[s],t[s],s,r,t):void 0;void 0===c&&(c=t[s]),o?Mt(r,s,c):kt(r,s,c)}return r},Ut=function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n},Ft=function(t){return E(t)&&"[object Arguments]"==x(t)},Lt=Object.prototype,Bt=Lt.hasOwnProperty,$t=Lt.propertyIsEnumerable,Ht=Ft(function(){return arguments}())?Ft:function(t){return E(t)&&Bt.call(t,"callee")&&!$t.call(t,"callee")},Qt=Array.isArray,qt=r(5),Vt=/^(?:0|[1-9]\d*)$/,Kt=function(t,e){var r=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==r||"symbol"!=r&&Vt.test(t))&&t>-1&&t%1==0&&t<e},Yt=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991},Gt={};Gt["[object Float32Array]"]=Gt["[object Float64Array]"]=Gt["[object Int8Array]"]=Gt["[object Int16Array]"]=Gt["[object Int32Array]"]=Gt["[object Uint8Array]"]=Gt["[object Uint8ClampedArray]"]=Gt["[object Uint16Array]"]=Gt["[object Uint32Array]"]=!0,Gt["[object Arguments]"]=Gt["[object Array]"]=Gt["[object ArrayBuffer]"]=Gt["[object Boolean]"]=Gt["[object DataView]"]=Gt["[object Date]"]=Gt["[object Error]"]=Gt["[object Function]"]=Gt["[object Map]"]=Gt["[object Number]"]=Gt["[object Object]"]=Gt["[object RegExp]"]=Gt["[object Set]"]=Gt["[object String]"]=Gt["[object WeakMap]"]=!1;var Xt=function(t){return E(t)&&Yt(t.length)&&!!Gt[x(t)]},Jt=function(t){return function(e){return t(e)}},te=r(2),ee=te.a&&te.a.isTypedArray,re=ee?Jt(ee):Xt,ne=Object.prototype.hasOwnProperty,oe=function(t,e){var r=Qt(t),n=!r&&Ht(t),o=!r&&!n&&Object(qt.a)(t),i=!r&&!n&&!o&&re(t),a=r||n||o||i,s=a?Ut(t.length,String):[],c=s.length;for(var u in t)!e&&!ne.call(t,u)||a&&("length"==u||o&&("offset"==u||"parent"==u)||i&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||Kt(u,c))||s.push(u);return s},ie=Object.prototype,ae=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||ie)},se=function(t,e){return function(r){return t(e(r))}},ce=se(Object.keys,Object),ue=Object.prototype.hasOwnProperty,he=function(t){if(!ae(t))return ce(t);var e=[];for(var r in Object(t))ue.call(t,r)&&"constructor"!=r&&e.push(r);return e},le=function(t){return null!=t&&Yt(t.length)&&!Y(t)},de=function(t){return le(t)?oe(t):he(t)},fe=function(t,e){return t&&Nt(e,de(e),t)},pe=function(t){var e=[];if(null!=t)for(var r in Object(t))e.push(r);return e},ye=Object.prototype.hasOwnProperty,_e=function(t){if(!s(t))return pe(t);var e=ae(t),r=[];for(var n in t)("constructor"!=n||!e&&ye.call(t,n))&&r.push(n);return r},me=function(t){return le(t)?oe(t,!0):_e(t)},ge=function(t,e){return t&&Nt(e,me(e),t)},be=r(8),ve=function(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e},je=function(t,e){for(var r=-1,n=null==t?0:t.length,o=0,i=[];++r<n;){var a=t[r];e(a,r,t)&&(i[o++]=a)}return i},we=function(){return[]},xe=Object.prototype.propertyIsEnumerable,Ee=Object.getOwnPropertySymbols,Ce=Ee?function(t){return null==t?[]:(t=Object(t),je(Ee(t),(function(e){return xe.call(t,e)})))}:we,Oe=function(t,e){return Nt(t,Ce(t),e)},Pe=function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t},Ae=se(Object.getPrototypeOf,Object),Te=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)Pe(e,Ce(t)),t=Ae(t);return e}:we,We=function(t,e){return Nt(t,Te(t),e)},Re=function(t,e,r){var n=e(t);return Qt(t)?n:Pe(n,r(t))},Se=function(t){return Re(t,de,Ce)},De=function(t){return Re(t,me,Te)},Ze=ht(c.a,"DataView"),Ie=ht(c.a,"Promise"),Me=ht(c.a,"Set"),ze=ht(c.a,"WeakMap"),ke=et(Ze),Ne=et(lt),Ue=et(Ie),Fe=et(Me),Le=et(ze),Be=x;(Ze&&"[object DataView]"!=Be(new Ze(new ArrayBuffer(1)))||lt&&"[object Map]"!=Be(new lt)||Ie&&"[object Promise]"!=Be(Ie.resolve())||Me&&"[object Set]"!=Be(new Me)||ze&&"[object WeakMap]"!=Be(new ze))&&(Be=function(t){var e=x(t),r="[object Object]"==e?t.constructor:void 0,n=r?et(r):"";if(n)switch(n){case ke:return"[object DataView]";case Ne:return"[object Map]";case Ue:return"[object Promise]";case Fe:return"[object Set]";case Le:return"[object WeakMap]"}return e});var $e=Be,He=Object.prototype.hasOwnProperty,Qe=function(t){var e=t.length,r=new t.constructor(e);return e&&"string"==typeof t[0]&&He.call(t,"index")&&(r.index=t.index,r.input=t.input),r},qe=c.a.Uint8Array,Ve=function(t){var e=new t.constructor(t.byteLength);return new qe(e).set(new qe(t)),e},Ke=function(t,e){var r=e?Ve(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)},Ye=/\w*$/,Ge=function(t){var e=new t.constructor(t.source,Ye.exec(t));return e.lastIndex=t.lastIndex,e},Xe=p?p.prototype:void 0,Je=Xe?Xe.valueOf:void 0,tr=function(t){return Je?Object(Je.call(t)):{}},er=function(t,e){var r=e?Ve(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)},rr=function(t,e,r){var n=t.constructor;switch(e){case"[object ArrayBuffer]":return Ve(t);case"[object Boolean]":case"[object Date]":return new n(+t);case"[object DataView]":return Ke(t,r);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return er(t,r);case"[object Map]":case"[object Set]":return new n;case"[object Number]":case"[object String]":return new n(t);case"[object RegExp]":return Ge(t);case"[object Symbol]":return tr(t)}},nr=Object.create,or=function(){function t(){}return function(e){if(!s(e))return{};if(nr)return nr(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),ir=function(t){return"function"!=typeof t.constructor||ae(t)?{}:or(Ae(t))},ar=function(t){return E(t)&&"[object Map]"==$e(t)},sr=te.a&&te.a.isMap,cr=sr?Jt(sr):ar,ur=function(t){return E(t)&&"[object Set]"==$e(t)},hr=te.a&&te.a.isSet,lr=hr?Jt(hr):ur,dr={};dr["[object Arguments]"]=dr["[object Array]"]=dr["[object ArrayBuffer]"]=dr["[object DataView]"]=dr["[object Boolean]"]=dr["[object Date]"]=dr["[object Float32Array]"]=dr["[object Float64Array]"]=dr["[object Int8Array]"]=dr["[object Int16Array]"]=dr["[object Int32Array]"]=dr["[object Map]"]=dr["[object Number]"]=dr["[object Object]"]=dr["[object RegExp]"]=dr["[object Set]"]=dr["[object String]"]=dr["[object Symbol]"]=dr["[object Uint8Array]"]=dr["[object Uint8ClampedArray]"]=dr["[object Uint16Array]"]=dr["[object Uint32Array]"]=!0,dr["[object Error]"]=dr["[object Function]"]=dr["[object WeakMap]"]=!1;var fr=function t(e,r,n,o,i,a){var c,u=1&r,h=2&r,l=4&r;if(n&&(c=i?n(e,o,i,a):n(e)),void 0!==c)return c;if(!s(e))return e;var d=Qt(e);if(d){if(c=Qe(e),!u)return ve(e,c)}else{var f=$e(e),p="[object Function]"==f||"[object GeneratorFunction]"==f;if(Object(qt.a)(e))return Object(be.a)(e,u);if("[object Object]"==f||"[object Arguments]"==f||p&&!i){if(c=h||p?{}:ir(e),!u)return h?We(e,ge(c,e)):Oe(e,fe(c,e))}else{if(!dr[f])return i?e:{};c=rr(e,f,u)}}a||(a=new Dt);var y=a.get(e);if(y)return y;a.set(e,c),lr(e)?e.forEach((function(o){c.add(t(o,r,n,o,e,a))})):cr(e)&&e.forEach((function(o,i){c.set(i,t(o,r,n,i,e,a))}));var _=d?void 0:(l?h?De:Se:h?me:de)(e);return Zt(_||e,(function(o,i){_&&(o=e[i=o]),kt(c,i,t(o,r,n,i,e,a))})),c},pr=function(t,e){return fr(t,5,e="function"==typeof e?e:void 0)},yr=Function.prototype,_r=Object.prototype,mr=yr.toString,gr=_r.hasOwnProperty,br=mr.call(Object),vr=function(t){if(!E(t)||"[object Object]"!=x(t))return!1;var e=Ae(t);if(null===e)return!0;var r=gr.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&mr.call(r)==br},jr=function(t){return E(t)&&1===t.nodeType&&!vr(t)};function wr(t,e=new Set){const r=[t],n=new Set;for(;r.length>0;){const o=r.shift();if(!(n.has(o)||xr(o)||e.has(o)))if(n.add(o),o[Symbol.iterator])try{for(const t of o)r.push(t)}catch(t){}else for(const t in o)"defaultValue"!==t&&r.push(o[t])}return n}function xr(t){const e=Object.prototype.toString.call(t),r=typeof t;return"number"===r||"boolean"===r||"string"===r||"symbol"===r||"function"===r||"[object Date]"===e||"[object RegExp]"===e||"[object Module]"===e||null==t||t instanceof EventTarget||t instanceof Event}function Er(t,e,r=new Set){if(t===e&&"object"==typeof(n=t)&&null!==n)return!0;var n;const o=wr(t,r),i=wr(e,r);for(const a of o)if(i.has(a))return!0;return!1}class Cr{constructor(t){if(this.crashes=[],this.state="initializing",this._crashNumberLimit="number"==typeof t.crashNumberLimit?t.crashNumberLimit:3,this._now=Date.now,this._minimumNonErrorTimePeriod="number"==typeof t.minimumNonErrorTimePeriod?t.minimumNonErrorTimePeriod:5e3,this._boundErrorHandler=t=>{const e=t.error||t.reason;e instanceof Error&&this._handleError(e,t)},this._listeners={},!this._restart)throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.")}setCreator(t){this._creator=t}setDestructor(t){this._destructor=t}destroy(){this._stopErrorHandling(),this._listeners={}}on(t,e){this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e)}off(t,e){this._listeners[t]=this._listeners[t].filter((t=>t!==e))}_fire(t,...e){const r=this._listeners[t]||[];for(const n of r)n.apply(this,[null,...e])}_startErrorHandling(){window.addEventListener("error",this._boundErrorHandler),window.addEventListener("unhandledrejection",this._boundErrorHandler)}_stopErrorHandling(){window.removeEventListener("error",this._boundErrorHandler),window.removeEventListener("unhandledrejection",this._boundErrorHandler)}_handleError(t,e){if(this._shouldReactToError(t)){this.crashes.push({message:t.message,stack:t.stack,filename:e.filename,lineno:e.lineno,colno:e.colno,date:this._now()});const r=this._shouldRestart();this.state="crashed",this._fire("stateChange"),this._fire("error",{error:t,causesRestart:r}),r?this._restart():(this.state="crashedPermanently",this._fire("stateChange"))}}_shouldReactToError(t){return t.is&&t.is("CKEditorError")&&void 0!==t.context&&null!==t.context&&"ready"===this.state&&this._isErrorComingFromThisItem(t)}_shouldRestart(){return this.crashes.length<=this._crashNumberLimit||(this.crashes[this.crashes.length-1].date-this.crashes[this.crashes.length-1-this._crashNumberLimit].date)/this._crashNumberLimit>this._minimumNonErrorTimePeriod}}class Or extends Cr{constructor(t,e={}){super(e),this._editor=null,this._throttledSave=Z(this._save.bind(this),"number"==typeof e.saveInterval?e.saveInterval:5e3),this._creator=(e,r)=>t.create(e,r),this._destructor=t=>t.destroy()}get editor(){return this._editor}get _item(){return this._editor}_restart(){return Promise.resolve().then((()=>(this.state="initializing",this._fire("stateChange"),this._destroy()))).catch((t=>{console.error("An error happened during the editor destroying.",t)})).then((()=>{if("string"==typeof this._elementOrData)return this.create(this._data,this._config,this._config.context);{const t=Object.assign({},this._config,{initialData:this._data});return this.create(this._elementOrData,t,t.context)}})).then((()=>{this._fire("restart")}))}create(t=this._elementOrData,e=this._config,r){return Promise.resolve().then((()=>(super._startErrorHandling(),this._elementOrData=t,this._config=this._cloneEditorConfiguration(e)||{},this._config.context=r,this._creator(t,this._config)))).then((t=>{this._editor=t,t.model.document.on("change:data",this._throttledSave),this._lastDocumentVersion=t.model.document.version,this._data=this._getData(),this.state="ready",this._fire("stateChange")}))}destroy(){return Promise.resolve().then((()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy())))}_destroy(){return Promise.resolve().then((()=>{this._stopErrorHandling(),this._throttledSave.flush();const t=this._editor;return this._editor=null,this._destructor(t)}))}_save(){const t=this._editor.model.document.version;if(t!==this._lastDocumentVersion)try{this._data=this._getData(),this._lastDocumentVersion=t}catch(t){console.error(t,"An error happened during restoring editor data. Editor will be restored from the previously saved data.")}}_setExcludedProperties(t){this._excludedProps=t}_getData(){const t={};for(const e of this._editor.model.document.getRootNames())t[e]=this._editor.data.get({rootName:e});return t}_isErrorComingFromThisItem(t){return Er(this._editor,t.context,this._excludedProps)}_cloneEditorConfiguration(t){return pr(t,((t,e)=>jr(t)||"context"===e?t:void 0))}}const Pr=new Array(256).fill().map(((t,e)=>("0"+e.toString(16)).slice(-2)));class Ar extends Cr{constructor(t,e={}){super(e),this._watchdogs=new Map,this._watchdogConfig=e,this._context=null,this._contextProps=new Set,this._actionQueue=new Tr,this._creator=e=>t.create(e),this._destructor=t=>t.destroy(),this._actionQueue.onEmpty((()=>{"initializing"===this.state&&(this.state="ready",this._fire("stateChange"))}))}get context(){return this._context}create(t={}){return this._actionQueue.enqueue((()=>(this._contextConfig=t,this._create())))}getItem(t){return this._getWatchdog(t)._item}getItemState(t){return this._getWatchdog(t).state}add(t){const e=Array.isArray(t)?t:[t];return this._actionQueue.enqueue((()=>{if("destroyed"===this.state)throw new Error("Cannot add items to destroyed watchdog.");if(!this._context)throw new Error("Context was not created yet. You should call the `ContextWatchdog#create()` method first.");return Promise.all(e.map((t=>{let e;if(this._watchdogs.has(t.id))throw new Error(`Item with the given id is already added: '${t.id}'.`);if("editor"===t.type)return e=new Or(this._watchdogConfig),e.setCreator(t.creator),e._setExcludedProperties(this._contextProps),t.destructor&&e.setDestructor(t.destructor),this._watchdogs.set(t.id,e),e.on("error",((r,{error:n,causesRestart:o})=>{this._fire("itemError",{itemId:t.id,error:n}),o&&this._actionQueue.enqueue((()=>new Promise((r=>{e.on("restart",function n(){e.off("restart",n),this._fire("itemRestart",{itemId:t.id}),r()}.bind(this))}))))})),e.create(t.sourceElementOrData,t.config,this._context);throw new Error(`Not supported item type: '${t.type}'.`)})))}))}remove(t){const e=Array.isArray(t)?t:[t];return this._actionQueue.enqueue((()=>Promise.all(e.map((t=>{const e=this._getWatchdog(t);return this._watchdogs.delete(t),e.destroy()})))))}destroy(){return this._actionQueue.enqueue((()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy())))}_restart(){return this._actionQueue.enqueue((()=>(this.state="initializing",this._fire("stateChange"),this._destroy().catch((t=>{console.error("An error happened during destroying the context or items.",t)})).then((()=>this._create())).then((()=>this._fire("restart"))))))}_create(){return Promise.resolve().then((()=>(this._startErrorHandling(),this._creator(this._contextConfig)))).then((t=>(this._context=t,this._contextProps=wr(this._context),Promise.all(Array.from(this._watchdogs.values()).map((t=>(t._setExcludedProperties(this._contextProps),t.create(void 0,void 0,this._context))))))))}_destroy(){return Promise.resolve().then((()=>{this._stopErrorHandling();const t=this._context;return this._context=null,this._contextProps=new Set,Promise.all(Array.from(this._watchdogs.values()).map((t=>t.destroy()))).then((()=>this._destructor(t)))}))}_getWatchdog(t){const e=this._watchdogs.get(t);if(!e)throw new Error(`Item with the given id was not registered: ${t}.`);return e}_isErrorComingFromThisItem(t){for(const e of this._watchdogs.values())if(e._isErrorComingFromThisItem(t))return!1;return Er(this._context,t.context)}}class Tr{constructor(){this._promiseQueue=Promise.resolve(),this._onEmptyCallbacks=[]}onEmpty(t){this._onEmptyCallbacks.push(t)}enqueue(t){let e;const r=this._promiseQueue.then(t).then((()=>{this._promiseQueue===e&&this._onEmptyCallbacks.forEach((t=>t()))}));return e=this._promiseQueue=r.catch((()=>{})),r}}const Wr=o.a.createContext("contextWatchdog");class Rr extends o.a.Component{constructor(t,e){super(t,e),this.contextWatchdog=null,this.props.isLayoutReady&&this._initializeContextWatchdog(this.props.config)}shouldComponentUpdate(t){return t.id!==this.props.id&&(this.contextWatchdog&&this.contextWatchdog.destroy(),this._initializeContextWatchdog(t.config)),t.isLayoutReady&&!this.contextWatchdog?(this._initializeContextWatchdog(t.config),!0):this.props.children!==t.children}render(){return o.a.createElement(Wr.Provider,{value:this.contextWatchdog},this.props.children)}componentWillUnmount(){this._destroyContext()}_initializeContextWatchdog(t){this.contextWatchdog=new Ar(this.props.context),this.contextWatchdog.create(t).catch((t=>{this.props.onError(t,{phase:"initialization",willContextRestart:!1})})),this.contextWatchdog.on("error",((t,e)=>{this.props.onError(e.error,{phase:"runtime",willContextRestart:e.causesRestart})})),this.contextWatchdog.on("stateChange",(()=>{"ready"===this.contextWatchdog.state&&this.props.onReady&&this.props.onReady(this.contextWatchdog.context)}))}_destroyContext(){this.contextWatchdog&&(this.contextWatchdog.destroy(),this.contextWatchdog=null)}}Rr.defaultProps={isLayoutReady:!0,onError:(t,e)=>console.error(t,e)},Rr.propTypes={id:a.a.string,isLayoutReady:a.a.bool,context:a.a.func,config:a.a.object,onReady:a.a.func,onError:a.a.func};class Sr extends o.a.Component{constructor(t){super(t),this.domContainer=o.a.createRef(),this.watchdog=null}get editor(){return this.watchdog?this.watchdog.editor:null}shouldComponentUpdate(t){return!(!this.editor||t.id===this.props.id&&(this._shouldUpdateEditor(t)&&this.editor.setData(t.data),"disabled"in t&&(this.editor.isReadOnly=t.disabled),1))}componentDidMount(){this._initializeEditor()}componentDidUpdate(){this._destroyEditor(),this._initializeEditor()}componentWillUnmount(){this._destroyEditor()}render(){return o.a.createElement("div",{ref:this.domContainer})}_initializeEditor(){this.context instanceof Ar?this.watchdog=new Dr(this.context):this.watchdog=new Sr._EditorWatchdog(this.props.editor),this.watchdog.setCreator(((t,e)=>this._createEditor(t,e))),this.watchdog.on("error",((t,{error:e,causesRestart:r})=>{this.props.onError(e,{phase:"runtime",willEditorRestart:r})})),this.watchdog.create(this.domContainer.current,this._getConfig()).catch((t=>this.props.onError(t,{phase:"initialization",willEditorRestart:!1})))}_createEditor(t,e){return this.props.editor.create(t,e).then((t=>{"disabled"in this.props&&(t.isReadOnly=this.props.disabled);const e=t.model.document,r=t.editing.view.document;return e.on("change:data",(e=>{this.props.onChange&&this.props.onChange(e,t)})),r.on("focus",(e=>{this.props.onFocus&&this.props.onFocus(e,t)})),r.on("blur",(e=>{this.props.onBlur&&this.props.onBlur(e,t)})),setTimeout((()=>{this.props.onReady&&this.props.onReady(this.editor)})),t}))}_destroyEditor(){this.watchdog&&(this.watchdog.destroy(),this.watchdog=null)}_shouldUpdateEditor(t){return this.props.data!==t.data&&this.editor.getData()!==t.data}_getConfig(){return this.props.data&&this.props.config.initialData&&console.warn("Editor data should be provided either using `config.initialData` or `data` properties. The config property is over the data value and the first one will be used when specified both."),{...this.props.config,initialData:this.props.config.initialData||this.props.data||""}}}class Dr{constructor(t){this._contextWatchdog=t,this._id=function(){const t=4294967296*Math.random()>>>0,e=4294967296*Math.random()>>>0,r=4294967296*Math.random()>>>0,n=4294967296*Math.random()>>>0;return"e"+Pr[t>>0&255]+Pr[t>>8&255]+Pr[t>>16&255]+Pr[t>>24&255]+Pr[e>>0&255]+Pr[e>>8&255]+Pr[e>>16&255]+Pr[e>>24&255]+Pr[r>>0&255]+Pr[r>>8&255]+Pr[r>>16&255]+Pr[r>>24&255]+Pr[n>>0&255]+Pr[n>>8&255]+Pr[n>>16&255]+Pr[n>>24&255]}()}setCreator(t){this._creator=t}create(t,e){return this._contextWatchdog.add({sourceElementOrData:t,config:e,creator:this._creator,id:this._id,type:"editor"})}on(t,e){this._contextWatchdog.on("itemError",((t,{itemId:r,causesRestart:n,error:o})=>{r===this._id&&e(null,{error:o,causesRestart:n})}))}destroy(){this._contextWatchdog.remove(this._id)}get editor(){return this._contextWatchdog.getItem(this._id)}}Sr.contextType=Wr,Sr.propTypes={editor:a.a.func.isRequired,data:a.a.string,config:a.a.object,onChange:a.a.func,onReady:a.a.func,onFocus:a.a.func,onBlur:a.a.func,onError:a.a.func,disabled:a.a.bool,onInit:(t,e)=>{if(t[e])return new Error('The "onInit" property is not supported anymore by the CKEditor component. Use the "onReady" property instead.')}},Sr.defaultProps={config:{},onError:(t,e)=>console.error(t,e)},Sr._EditorWatchdog=Or}]))},5295:function(t,e,r){"use strict";r.d(e,{Z:function(){return m}});var n=r(7462),o=r(3366),i=r(7294),a=r(6010),s=r(4780),c=r(948),u=r(1657),h=r(4680),l=r(1588),d=r(4867);function f(t){return(0,d.Z)("MuiCard",t)}(0,l.Z)("MuiCard",["root"]);var p=r(5893);const y=["className","raised"],_=(0,c.ZP)(h.Z,{name:"MuiCard",slot:"Root",overridesResolver:(t,e)=>e.root})((()=>({overflow:"hidden"})));var m=i.forwardRef((function(t,e){const r=(0,u.Z)({props:t,name:"MuiCard"}),{className:i,raised:c=!1}=r,h=(0,o.Z)(r,y),l=(0,n.Z)({},r,{raised:c}),d=(t=>{const{classes:e}=t;return(0,s.Z)({root:["root"]},f,e)})(l);return(0,p.jsx)(_,(0,n.Z)({className:(0,a.Z)(d.root,i),elevation:c?8:void 0,ref:e,ownerState:l},h))}))},2643:function(t,e,r){"use strict";r.d(e,{Z:function(){return _}});var n=r(7462),o=r(3366),i=r(7294),a=r(6010),s=r(4780),c=r(948),u=r(1657),h=r(1588),l=r(4867);function d(t){return(0,l.Z)("MuiCardContent",t)}(0,h.Z)("MuiCardContent",["root"]);var f=r(5893);const p=["className","component"],y=(0,c.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(t,e)=>e.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}})));var _=i.forwardRef((function(t,e){const r=(0,u.Z)({props:t,name:"MuiCardContent"}),{className:i,component:c="div"}=r,h=(0,o.Z)(r,p),l=(0,n.Z)({},r,{component:c}),_=(t=>{const{classes:e}=t;return(0,s.Z)({root:["root"]},d,e)})(l);return(0,f.jsx)(y,(0,n.Z)({as:c,className:(0,a.Z)(_.root,i),ownerState:l,ref:e},h))}))},2340:function(t,e,r){"use strict";r.r(e);var n=r(5785),o=r(7294),i=r(2757),a=r(2002),s=r.n(a),c=r(9782),u=r(1791),h=r(1508),l=r(6447),d=r(3460),f=r(6446),p=r(6036),y=r(3797),_=r(5725),m=r(2658),g=r(5295),b=r(2643),v=r(4213),j=r(2982),w=r(4402),x=r(2787),E=r(2162);const C='<html lang=\'en\'><body>\n<h2 id="references_header" style="text-align:center;">References</h2>\n<p style="text-align:center;" id="default_message">\n<span style="color:hsl(0, 0%, 60%);">Add your citations from .bib/.tex or search from external source by Article Title or DOI or URL</span>\n</p>\n<div class="csl-bib-body"></div>\n</body></html>\n',O=()=>{const{documentType:t,style:e,xml:r,setXml:i,setStyle:a,citations:s,setCitations:c}=(0,o.useContext)(u.r),_=(0,o.useCallback)((t=>{c([].concat((0,n.Z)(s),[t]))}),[s]),{cslDao:m}=(0,o.useContext)(E.c),g=(0,o.useCallback)((async t=>{const e=t.target.value,{xml:r}=await m.get(e);i(r),a(e)}),[]);return o.createElement(h.Z,{sx:{flexDirection:{xs:"column",md:"row"},display:"flex",background:"#f4f4f4",padding:"8px 0",marginBottom:"8px",border:"1px hsl(0, 0%, 82.7%) solid"}},o.createElement(h.Z,{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 8px"},o.createElement(l.Z,{direction:"row",alignItems:"center",width:"max-content"},o.createElement(d.Z,null,"Citation Style:"),o.createElement(f.Z,{sx:{m:1,minWidth:50},size:"small"},o.createElement(p.Z,{MenuProps:{style:{height:"220px"}},value:e,onChange:g,displayEmpty:!0,inputProps:{"aria-label":"Without label"}},Object.values(w.a).map((t=>{let{id:e}=t;return o.createElement(y.Z,{key:e.toLowerCase(),value:e.toLowerCase()},e.toLowerCase())}))))),o.createElement(h.Z,{display:{xs:"flex",md:"none"},alignItems:"start",marginTop:"4px"},o.createElement(j.Dr,null))),o.createElement(v.Rk,{documentType:t,style:e,xml:r,updateCitation:_}),o.createElement(h.Z,{display:{xs:"none",md:"flex"},marginTop:"4px"},o.createElement(j.Dr,null)))},P=()=>{const{documentType:t}=(0,o.useContext)(u.r);return o.createElement(_.ZP,{padding:1,container:!0,direction:"row",alignItems:"center"},v.$l[x.Co[t]],t.toUpperCase())},A=()=>o.createElement(h.Z,{margin:4},o.createElement(m.Z,{textAlign:"center",gutterBottom:!0,variant:"h5",component:"div"},"Difference Between Reference and Bibliography"),o.createElement(l.Z,{margin:4,flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around"},o.createElement(g.Z,{sx:{my:2,maxWidth:345}},o.createElement(b.Z,null,o.createElement(m.Z,{gutterBottom:!0,variant:"h5",component:"div"},"Reference List"),o.createElement(m.Z,{variant:"body2",color:"text.secondary"},"List of sources that have been referred to in your work directly."))),o.createElement(g.Z,{sx:{my:2,maxWidth:345}},o.createElement(b.Z,null,o.createElement(m.Z,{gutterBottom:!0,variant:"h5",component:"div"},"Bibliography"),o.createElement(m.Z,{variant:"body2",color:"text.secondary"},"List of sources referred to in your work, whether directly cited or not. You should include all of the materials you consulted in preparing your paper in a bibliography.")))));e.default=()=>{const{setCitations:t,setStyle:e,html:r,setHtml:n,setDocumentType:a}=(0,o.useContext)(u.r),l=(0,o.useCallback)(((t,e)=>{const r=e.getData();r.trim().length>0?n(r):n(C)}),[n]);return(0,o.useEffect)((()=>{const r=window.history.state;if(null===r||!(r.citations&&r.style&&r.citationDocument))return void n(C);const{citations:o,style:i,citationDocument:s}=r;t(o),e(i),a(s)}),[n]),r?o.createElement(h.Z,null,o.createElement(P,null),o.createElement(O,null),o.createElement("div",{className:"document-editor"},o.createElement("div",{className:"document-editor__toolbar"}),o.createElement("div",{className:"document-editor__editable-container"},o.createElement(i.CKEditor,{onChange:l,editor:s(),data:r,config:{htmlSupport:{allow:[{name:/.*/,attributes:!0,classes:!0,styles:!0}]}}}))),o.createElement(A,null)):o.createElement(c.$,null)}}}]);
//# sourceMappingURL=340-c374c755c476345b7816.js.map