(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"./docz/matchBlockP.mdx":function(e,n,t){"use strict";t.r(n);var o=t("./node_modules/react/index.js"),r=t.n(o),a=t("./node_modules/@mdx-js/tag/dist/index.js"),s=t("./node_modules/docz/dist/index.m.js"),c=t("./src/index.js");function m(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}n.default=function(e){var n=e.components,t=m(e,["components"]);return r.a.createElement(a.MDXTag,{name:"wrapper",components:n},r.a.createElement(a.MDXTag,{name:"h1",components:n,props:{id:"matchblockp"}},"matchBlockP"),r.a.createElement(a.MDXTag,{name:"h2",components:n,props:{id:"basic-usage"}},"Basic usage"),r.a.createElement(a.MDXTag,{name:"p",components:n},"[add Usage Here]"),r.a.createElement(a.MDXTag,{name:"h2",components:n,props:{id:"gettheme-example"}},"getTheme Example"),r.a.createElement(s.Playground,{__position:0,__code:"{() => {\n  const defaultTheme = { colors: { red: '#f5222d' } }\n  const { matchBlockP } = new Assistant({ defaultTheme })\n  let o = {}\n  return (\n    <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(o, undefined, 2)}</pre>\n  )\n}}",__scope:{props:t,Assistant:c.a}},function(){new c.a({defaultTheme:{colors:{red:"#f5222d"}}}).matchBlockP;return r.a.createElement("pre",{style:{fontSize:".8rem"}},JSON.stringify({},void 0,2))}))}}}]);