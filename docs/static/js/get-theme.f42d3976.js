(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"./docz/getTheme.mdx":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/react/index.js"),r=n.n(o),s=n("./node_modules/@mdx-js/tag/dist/index.js"),a=n("./node_modules/docz/dist/index.m.js"),m=n("./src/index.js");function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},s=Object.keys(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}t.default=function(e){var t=e.components,n=c(e,["components"]);return r.a.createElement(s.MDXTag,{name:"wrapper",components:t},r.a.createElement(s.MDXTag,{name:"h1",components:t,props:{id:"gettheme"}},"getTheme"),r.a.createElement(s.MDXTag,{name:"h2",components:t,props:{id:"basic-usage"}},"Basic usage"),r.a.createElement(s.MDXTag,{name:"p",components:t},"[add Usage Here]"),r.a.createElement(s.MDXTag,{name:"h2",components:t,props:{id:"example-output"}},"Example Output"),r.a.createElement(a.Playground,{__position:0,__code:"{() => {\n  const defaultTheme = { colors: { red: '#f5222d' } }\n  const { getTheme } = new Assistant({ defaultTheme })\n  const emptyProps = {}\n  const withProps = { theme: { colors: { blue: 'myBlueColor' } } }\n  let o = {}\n  o.withEmptyProps = getTheme('colors') //=>\"red\": \"#f5222d\"\n  o.dotNotation = getTheme('colors.red') //=>\"#f5222d\",\n  return (\n    <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(o, undefined, 2)}</pre>\n  )\n}}",__scope:{props:n,Assistant:m.a}},function(){var e=new m.a({defaultTheme:{colors:{red:"#f5222d"}}}).getTheme,t={};return t.withEmptyProps=e("colors"),t.dotNotation=e("colors.red"),r.a.createElement("pre",{style:{fontSize:".8rem"}},JSON.stringify(t,void 0,2))}))}}}]);