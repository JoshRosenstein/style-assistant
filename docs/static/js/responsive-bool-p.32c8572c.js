(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"./docz/responsiveBoolP.mdx":function(e,n,t){"use strict";t.r(n);var o=t("./node_modules/react/index.js"),s=t.n(o),r=t("./node_modules/@mdx-js/tag/dist/index.js"),a=t("./node_modules/docz/dist/index.m.js"),p=t("./src/index.js");function i(e,n){if(null==e)return{};var t,o,s=function(e,n){if(null==e)return{};var t,o,s={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}n.default=function(e){var n=e.components,t=i(e,["components"]);return s.a.createElement(r.MDXTag,{name:"wrapper",components:n},s.a.createElement(r.MDXTag,{name:"h1",components:n,props:{id:"responsiveboolp"}},"responsiveBoolP"),s.a.createElement(r.MDXTag,{name:"blockquote",components:n},s.a.createElement(r.MDXTag,{name:"p",components:n,parentName:"blockquote"},s.a.createElement(r.MDXTag,{name:"strong",components:n,parentName:"p"},"Dependencies:")," | |")),s.a.createElement(r.MDXTag,{name:"h2",components:n,props:{id:"basic-usage"}},"Basic usage"),s.a.createElement(r.MDXTag,{name:"p",components:n},"[add Usage Here]"),s.a.createElement(r.MDXTag,{name:"h2",components:n,props:{id:"example-output"}},"Example Output"),s.a.createElement(a.Playground,{__position:0,__code:"{() => {\n  const defaultTheme = {\n    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128],\n    fontSizesObj: { xs: 12, sm: 14, md: 16, lg: 20 },\n    breakpoints: [640, 832, 1024],\n  }\n  const responsivePOptions = { transform: true }\n  const { responsive } = new Assistant({ defaultTheme, responsivePOptions })\n  let o = {}\n  o.basic = responsive({})\n  return (\n    <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(o, undefined, 2)}</pre>\n  )\n}}",__scope:{props:t,Assistant:p.a}},function(){var e=new p.a({defaultTheme:{fontSizes:[12,14,16,20,24,32,48,64,96,128],fontSizesObj:{xs:12,sm:14,md:16,lg:20},breakpoints:[640,832,1024]},responsivePOptions:{transform:!0}}).responsive,n={};return n.basic=e({}),s.a.createElement("pre",{style:{fontSize:".8rem"}},JSON.stringify(n,void 0,2))}))}}}]);