(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"./docz/transformStyle.mdx":function(e,n,t){"use strict";t.r(n);var o=t("./node_modules/react/index.js"),a=t.n(o),r=t("./node_modules/@mdx-js/tag/dist/index.js"),s=t("./node_modules/docz/dist/index.m.js"),m=t("./src/index.js");function p(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}n.default=function(e){var n=e.components,t=p(e,["components"]);return a.a.createElement(r.MDXTag,{name:"wrapper",components:n},a.a.createElement(r.MDXTag,{name:"h1",components:n,props:{id:"transformstyle"}},"transformStyle"),a.a.createElement(r.MDXTag,{name:"blockquote",components:n},a.a.createElement(r.MDXTag,{name:"p",components:n,parentName:"blockquote"},a.a.createElement(r.MDXTag,{name:"strong",components:n,parentName:"p"},"Dependencies:")," | |")),a.a.createElement(r.MDXTag,{name:"h2",components:n,props:{id:"basic-usage"}},"Basic usage"),a.a.createElement(r.MDXTag,{name:"p",components:n},"[add Usage Here]"),a.a.createElement(r.MDXTag,{name:"h2",components:n,props:{id:"example-output"}},"Example Output"),a.a.createElement(s.Playground,{__position:0,__code:"{() => {\n  const defaultTheme = {\n    breakpoints: { tablet: 640, laptop: 832, desktop: 1024 },\n  }\n  const styler = new Assistant({ defaultTheme })\n  const o = {}\n  o.One = styler.toMq({ screen: true, min: 1500 })\n  o.Two = styler.toMq({ max: 1500, min: 1200 })\n  o.Three = styler.toMq({\n    screen: true,\n    orientation: 'landscape',\n    'min-device-width': 639,\n  })\n  return (\n    <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(o, undefined, 2)}</pre>\n  )\n}}",__scope:{props:t,Assistant:m.a}},function(){var e=new m.a({defaultTheme:{breakpoints:{tablet:640,laptop:832,desktop:1024}}}),n={};return n.One=e.toMq({screen:!0,min:1500}),n.Two=e.toMq({max:1500,min:1200}),n.Three=e.toMq({screen:!0,orientation:"landscape","min-device-width":639}),a.a.createElement("pre",{style:{fontSize:".8rem"}},JSON.stringify(n,void 0,2))}))}}}]);