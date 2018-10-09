(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"./docz/matchBlockP.mdx":function(e,o,n){"use strict";n.r(o);var t=n("./node_modules/react/index.js"),c=n.n(t),r=n("./node_modules/@mdx-js/tag/dist/index.js"),s=n("./node_modules/docz/dist/index.m.js"),a=n("./src/index.js");function i(e,o){if(null==e)return{};var n,t,c=function(e,o){if(null==e)return{};var n,t,c={},r=Object.keys(e);for(t=0;t<r.length;t++)n=r[t],o.indexOf(n)>=0||(c[n]=e[n]);return c}(e,o);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)n=r[t],o.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}o.default=function(e){var o=e.components,n=i(e,["components"]);return c.a.createElement(r.MDXTag,{name:"wrapper",components:o},c.a.createElement(r.MDXTag,{name:"h1",components:o,props:{id:"matchblockp"}},"matchBlockP"),c.a.createElement(r.MDXTag,{name:"h2",components:o,props:{id:"basic-usage"}},"Basic usage"),c.a.createElement(r.MDXTag,{name:"p",components:o},"[add Usage Here]"),c.a.createElement(r.MDXTag,{name:"h2",components:o,props:{id:"gettheme-example"}},"getTheme Example"),c.a.createElement(s.Playground,{__position:0,__code:"{() => {\n  const defaultTheme = { colors: { red: '#f5222d' }, space: {} }\n  const { matchBlockP, switchP, getThemeP } = new Assistant({ defaultTheme })\n  let o = {}\n  const matchBlockFunc = matchBlockP({\n    basicBoolProp: {\n      color: 'blue',\n      fontSize: 2,\n    },\n    size: size => [{ height: size + 'px' }, { width: size / 2 + 'px' }], //Can use arrays\n    c: c => ({\n      color: getThemeP(['colors', c]), // props are passed to functions\n    }),\n  })\n  o.BasicProp = matchBlockFunc({ basicBoolProp: true })\n  o.ColorC = matchBlockFunc({ c: 'red' })\n  o.size = matchBlockFunc({ size: 8 })\n  o.OrderMatters = matchBlockFunc({ basicBoolProp: true, c: 'red', size: 8 })\n  return (\n    <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(o, undefined, 2)}</pre>\n  )\n}}",__scope:{props:n,Assistant:a.a}},function(){var e=new a.a({defaultTheme:{colors:{red:"#f5222d"},space:{}}}),o=e.matchBlockP,n=(e.switchP,e.getThemeP),t={},r=o({basicBoolProp:{color:"blue",fontSize:2},size:function(e){return[{height:e+"px"},{width:e/2+"px"}]},c:function(e){return{color:n(["colors",e])}}});return t.BasicProp=r({basicBoolProp:!0}),t.ColorC=r({c:"red"}),t.size=r({size:8}),t.OrderMatters=r({basicBoolProp:!0,c:"red",size:8}),c.a.createElement("pre",{style:{fontSize:".8rem"}},JSON.stringify(t,void 0,2))}))}}}]);