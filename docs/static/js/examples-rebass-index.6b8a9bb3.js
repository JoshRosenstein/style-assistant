(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"./docz/Examples/rebass/index.mdx":function(e,n,t){"use strict";t.r(n);var o=t("./node_modules/react/index.js"),r=t.n(o),s=t("./node_modules/@mdx-js/tag/dist/index.js"),a=t("./node_modules/docz/dist/index.m.js"),p=t("./src/index.js"),i=t("./node_modules/@emotion/is-prop-valid/dist/is-prop-valid.esm.js"),l=t("./node_modules/@roseys/clean-props-by-tag/dist/cleanPropsbyTag.min.js"),c=(i.a,function(){return!0}),m=function(e,n){return"string"===typeof e&&e.charCodeAt(0)>96?function(n){return Object(l.shouldForwardProp)(e,n)}:function(e){return function(n){return"theme"===n||"innerRef"===n||!e||"as"!==n}}(n)},d=function(e,n){for(var t=2,o=arguments.length;t<o;t++){var r=arguments[t],s=void 0;for(s in r)e(s)&&(n[s]=r[s])}return n},g=t("./node_modules/@emotion/core/dist/core.browser.esm.js"),u=t("./node_modules/@emotion/utils/dist/utils.browser.esm.js"),x=t("./node_modules/@emotion/serialize/dist/serialize.esm.js");function f(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function h(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var b=function e(n,t){var r,s,a,p;var i=!0;void 0!==t&&(r=t.label,p=t.target,i=!1!==t.enableAs,a=n.__emotion_forwardProp&&t.shouldForwardProp?function(e){return n.__emotion_forwardProp(e)&&t.shouldForwardProp(e)}:t.shouldForwardProp,s=a);var l=n.__emotion_real===n,b=l&&n.__emotion_base||n;return"function"!==typeof s&&(s=m(b,i)),function(){var y=arguments,B=l&&void 0!==n.__emotion_styles?n.__emotion_styles.slice(0):[];if(void 0!==r&&B.push("label:".concat(r,";")),null==y[0]||void 0===y[0].raw)B.push.apply(B,y);else{B.push(y[0][0]);for(var k=y.length,_=1;_<k;_++)B.push(y[_],y[0][_])}var E=Object(g.a)(function(e,n){var t=i&&e.as||b,r="",l=[],g=d(c,{},e,{theme:e.theme||n.theme});"string"===typeof e.className&&(r+=Object(u.a)(n.registered,l,e.className));var f=Object(x.a)(n.registered,B.concat(l),g),y=Object(u.b)(n,f,"string"===typeof t);r+="".concat(n.key,"-").concat(f.name),void 0!==p&&(r+=" ".concat(p));var k,_=e.as?a||m(t):s,E=o.createElement(t,d(_,{},e,{className:r,ref:e.innerRef}));return u.c||void 0===y?E:o.createElement(o.Fragment,null,o.createElement("style",(h(k={},"data-emotion-".concat(n.key),f.name),h(k,"dangerouslySetInnerHTML",{__html:y}),h(k,"nonce",n.sheet.nonce),k)),E)});E.displayName=void 0!==r?r:"Styled(".concat("string"===typeof b?b:b.displayName||b.name||"Component",")");var w=Object({NODE_ENV:"production",PUBLIC_URL:"/style-assistant/",WEBPACK_SERVE_OVERLAY_WS_URL:"undefined",npm_package_scripts_docz_build:"docz build",npm_package_scripts_docz_dev:"docz dev"}).PREACT?E:o.forwardRef(function(e,n){return o.createElement(E,null===n?e:d(c,{innerRef:n},e))});return w.__emotion_real=w,w.__emotion_base=b,w.__emotion_styles=B,w.__emotion_forwardProp=s,Object.defineProperty(w,"toString",{enumerable:!1,value:function(){return".".concat(p)}}),w.withComponent=function(n,o){return e(n,void 0!==o?d(c,{},t||{},o):t).apply(void 0,f(B))},w}},y=t("./node_modules/@roseys/futils/dist/futils.min.js"),B=Object(y.when)(y.isNumber,function(e){return"".concat(e,"px")}),k={keys:{},getter:{},functions:{identity:y.identity,returnAsIs:y.identity,propValue:y.identity,self:y.identity,px:B,ms:function(e){return"".concat(parseFloat(e),"ms")},pct:function(e){return e=parseFloat(e),e=Math.abs(e)<1?100*e:e,"".concat(e,"%")}}},_={defaultTheme:{breakpoints:{tablet:640,laptop:832,desktop:1024},space:[0,4,8,16,32,64,128,256,512],fontSizes:[12,14,16,20,24,32,48,64,96,128],lineHeights:[1,1.125,1.25,1.5],fontWeights:{normal:500,bold:"bold"},letterSpacings:{normal:"normal",caps:"0.25em"},radii:[0,2,4,8],borders:[0,"1px solid","2px solid"],shadows:{small:"0 0 4px rgba(0, 0, 0, .125)",large:"0 0 24px rgba(0, 0, 0, .125)"},colors:{blue:"blue",lightgray:"#f6f6ff"}},baseFontSize:16,themeKey:"theme",breakpointsKey:"breakpoints",alwaysTransform:!0,transformOptions:{defaultLookup:!0,defaultTransform:!0,keys:k.keys,getter:k.getter,functions:k.functions},responsivePOptions:{transform:!0},switchPOptions:{transform:!0,responsive:!0},parserOptions:{transform:!0}},E=new p.a(_),w=(E.pxToRem,E.pxToEm,E.pxToPct,E.pxToRelative,E.normalize,E.normalizeToEm,E.normalizeToRem,E.toMq,E.parse,E.getDefaultTheme,E.mergeDefaultTheme,E.getTheme,E.getThemeWithFallbackKey,E.getThemeOr,E.responsiveP),P=(E.responsiveBoolProp,E.switchP);E.transformStyle;function F(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(n){I(e,n,t[n])})}return e}function I(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object(y.path)("css");var A=function(e){return"number"===typeof e&&!isNaN(e)},T=function(e){return A(e)?e+"px":e},v=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){return Object(y.flow)(n,Object(y.map)(Object(y.whenFunctionCallWith)(e)),y.compact,y.mergeAllDeepRight)}},S=function(e){return!A(e)||e>1?T(e):100*e+"%"},z=w({prop:"width",postFn:S}),j=w({cssProp:"fontSize",key:"fontSizes",prop:"fontSize",postFn:T,transform:!0}),C=v(w({prop:"color",key:"colors"}),w({prop:"bg",cssProp:"backgroundColor",key:"colors"})),R=w({prop:"fontFamily",key:"fonts"}),D=w({prop:"textAlign"}),H=w({prop:"lineHeight",key:"lineHeights"}),O=w({prop:"fontWeight",key:"fontWeights"}),L=(w({prop:"fontStyle"}),w({prop:"letterSpacing",key:"letterSpacings",postFn:T})),M=(w({prop:"display"}),w({prop:"maxWidth",key:"maxWidths",postFn:T}),w({prop:"minWidth",key:"minWidths",postFn:T}),w({prop:"height",key:"heights",postFn:T})),W=(w({prop:"maxHeight",key:"maxHeights",postFn:T}),w({prop:"minHeight",key:"minHeights",postFn:T}),w({prop:"size",cssProp:"width",postFn:T})),X=(v(w({prop:"size",cssProp:"height",postFn:T}),W),w({prop:"ratio",cssProp:"paddingBottom",postFn:function(e){return 100*e+"%"}}));F({},X.propTypes);w({prop:"verticalAlign"});var N=w({prop:"alignItems"}),U=(w({prop:"alignContent"}),w({prop:"justifyItems"}),w({prop:"justifyContent"})),K=w({prop:"flexWrap"}),V=(w({prop:"flexBasis",postFn:S}),w({prop:"flexDirection"})),$=w({prop:"flex"}),G=(w({prop:"justifySelf"}),w({prop:"alignSelf"})),J=w({prop:"order"}),q=(w({prop:"gridGap",postFn:T,key:"space"}),w({prop:"gridColumnGap",postFn:T,key:"space"}),w({prop:"gridRowGap",postFn:T,key:"space"}),w({prop:"gridColumn"}),w({prop:"gridRow"}),w({prop:"gridAutoFlow"}),w({prop:"gridAutoColumns"}),w({prop:"gridAutoRows"}),w({prop:"gridTemplateColumns"}),w({prop:"gridTemplateRows"}),w({prop:"gridTemplateAreas"}),w({prop:"gridArea"}),function(e){return A(e)&&e>0?e+"px solid":e}),Y=v(w({prop:"border",key:"borders",postFn:q}),w({prop:"borderTop",key:"borders",postFn:q}),w({prop:"borderRight",key:"borders",postFn:q}),w({prop:"borderBottom",key:"borders",postFn:q}),w({prop:"borderLeft",key:"borders",postFn:q})),Q=w({prop:"borderColor",key:"colors"}),Z=w({prop:"borderRadius",key:"radii",postFn:T}),ee=w({prop:"boxShadow",key:"shadows"}),ne=w({prop:"opacity"}),te=(w({prop:"overflow"}),w({prop:"background"}),w({prop:"backgroundImage"})),oe=w({prop:"backgroundSize"}),re=w({prop:"backgroundPosition"}),se=w({prop:"backgroundRepeat"}),ae=(w({prop:"position"}),w({prop:"zIndex"}),w({prop:"top",postFn:T}),w({prop:"right",postFn:T}),w({prop:"bottom",postFn:T}),w({prop:"left",postFn:T}),P({padding:"returnAsIs",p:"returnAsIs"},{cssProp:"padding",key:"space",postFn:T})),pe=P({paddingLeft:"returnAsIs",pl:"returnAsIs",px:"returnAsIs"},{cssProp:"paddingLeft",key:"space",postFn:T}),ie=P({paddingRight:"returnAsIs",pr:"returnAsIs",px:"returnAsIs"},{cssProp:"paddingRight",key:"space",postFn:T}),le=P({paddingTop:"returnAsIs",pt:"returnAsIs",py:"returnAsIs"},{cssProp:"paddingTop",key:"space",postFn:T}),ce=P({paddingBottom:"returnAsIs",pb:"returnAsIs",py:"returnAsIs"},{cssProp:"paddingBottom",key:"space",postFn:T}),me=P({margin:"returnAsIs",m:"returnAsIs"},{cssProp:"margin",key:"space",postFn:T}),de=P({marginLeft:"returnAsIs",ml:"returnAsIs",mx:"returnAsIs"},{cssProp:"marginLeft",key:"space",postFn:T}),ge=P({marginRight:"returnAsIs",mr:"returnAsIs",mx:"returnAsIs"},{cssProp:"marginRight",key:"space",postFn:T}),ue=v(P({marginTop:"returnAsIs",mt:"returnAsIs",my:"returnAsIs"},{cssProp:"marginTop",key:"space",postFn:T}),P({marginBottom:"returnAsIs",mb:"returnAsIs",my:"returnAsIs"},{cssProp:"marginBottom",key:"space",postFn:T}),de,ge,me,le,ce,ie,pe,ae),xe=w({key:"buttons",prop:"variant"}),fe=(w({prop:"textStyle",key:"textStyles"}),w({prop:"colors",key:"colorStyles"}),Object(y.path)("css")),he=function(e){return Object(y.path)(["theme",e])},be=b("div")(ue,z,j,C,$,J,G,he("Box"),fe),ye=b(be)({display:"flex"},K,V,N,U,he("Flex")),Be=b(be)(R,O,D,H,L,he("Text")),ke=b(Be)(he("Heading"));ke.defaultProps={as:"h2",m:0,fontSize:4,fontWeight:"bold"};var _e=b(be)(he("Link"));_e.defaultProps={as:"a",color:"blue"};var Ee=b(be)({appearance:"none",display:"inline-block",textAlign:"center",lineHeight:"inherit",textDecoration:"none"},O,Y,Q,Z,xe,he("Button"));Ee.defaultProps={as:"button",fontSize:"inherit",fontWeight:"bold",m:0,px:3,py:2,color:"white",bg:"blue",border:"0",borderRadius:4};var we=b(be)({maxWidth:"100%",height:"auto"},M,Z,he("Image"));we.defaultProps={as:"img",m:0};var Pe=w({key:"cards",prop:"variant"}),Fe=b(be)(Y,Q,Z,ee,te,oe,re,se,ne,he("Card"),Pe);function Ie(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},s=Object.keys(e);for(o=0;o<s.length;o++)t=s[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)t=s[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}n.default=function(e){var n=e.components,t=Ie(e,["components"]);return r.a.createElement(s.MDXTag,{name:"wrapper",components:n},r.a.createElement(s.MDXTag,{name:"h1",components:n,props:{id:"rebassexample"}},"rebassExample"),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"config"}},"Config"),r.a.createElement(s.MDXTag,{name:"h3",components:n,props:{id:"initialize-assistant"}},"Initialize Assistant"),r.a.createElement(s.MDXTag,{name:"pre",components:n},r.a.createElement(s.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:""}},"  export const {\n    responsiveP, \n    switchP,\n  } = new Assistant(config)\n")),r.a.createElement(s.MDXTag,{name:"h3",components:n,props:{id:"configdefaulttheme"}},"config.defaultTheme"),r.a.createElement(s.MDXTag,{name:"pre",components:n},r.a.createElement(s.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:""}}," const defaultTheme = {\n    breakpoints: {\n      tablet: 640,\n      laptop: 832,\n      desktop: 1024\n    },\n    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],\n    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128],\n    lineHeights: [1, 1.125, 1.25, 1.5],\n    fontWeights: {\n      normal: 500,\n      bold: 'bold'\n    },\n    letterSpacings: {\n      normal: 'normal',\n      caps: '0.25em'\n    },\n    radii: [0, 2, 4, 8],\n    borders: [0, '1px solid', '2px solid'],\n    shadows: {\n      small: '0 0 4px rgba(0, 0, 0, .125)',\n      large: '0 0 24px rgba(0, 0, 0, .125)'\n    },\n    colors: {\n      blue: 'blue',\n      lightgray: '#f6f6ff'\n    }\n  }\n")),r.a.createElement(s.MDXTag,{name:"h3",components:n,props:{id:"configdefaultlookups"}},"config.defaultLookups"),r.a.createElement(s.MDXTag,{name:"pre",components:n},r.a.createElement(s.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:""}},"import {identity} from '@roseys/futils'\n\n const defaultLookups = {\n    keys: {},\n    getter: {},\n    functions: {\n      // Shorthand lookup functions. used in switchP. If value is a string of one of the keys below, then will call corresponding function with corresponding prop value\n      identity,\n      returnAsIs: identity, // Can add aliases\n      propValue: identity, // alias\n      self: identity, // alias\n      px,\n      ms: x => `${parseFloat(x)}ms`,\n      pct: x => {\n        x = parseFloat(x)\n        x = Math.abs(x) < 1 ? x * 100 : x\n        return `${x}%`\n      }\n    }\n  }\n")),r.a.createElement(s.MDXTag,{name:"h3",components:n,props:{id:"config-1"}},"config"),r.a.createElement(s.MDXTag,{name:"pre",components:n},r.a.createElement(s.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:""}},"export const config={\n    defaultTheme,\n    baseFontSize: 16, // / Unitless value used for unit conversions Utils\n    themeKey: 'theme', // / Unitless value used for unit conversions Utils\n    breakpointsKey: 'breakpoints',\n    alwaysTransform: true,\n    transformOptions: {\n      defaultLookup: true,\n      defaultTransform: true,\n      keys: defaultLookups.keys,\n      getter: defaultLookups.getter,\n      functions: defaultLookups.functions\n    },\n    responsivePOptions: {\n      transform: true\n    },\n    switchPOptions: {\n      transform: true,\n      responsive:true\n    },\n    parserOptions: {\n      transform: true\n    }\n  }\n  \n")),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"styles"}},"styles"),r.a.createElement(s.MDXTag,{name:"pre",components:n},r.a.createElement(s.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:""}},"import {\n    mergeAllDeepRight,\n    flow,\n    when,\n    map,\n    isNumber,\n    ifElse,\n    either,lt,\n    complement,\n    whenFunctionCallWith,\n    identity,\n    prop,\n    compact\n  } from '@roseys/futils'\n  import Assistant from '../../src/index'\n  \n  const isNotNumber = complement(isNumber)\n  export const compose = (...funcs) => {\n    const fn = props =>\n      flow(\n        funcs,\n        map(whenFunctionCallWith(props)),\n        compact,\n        mergeAllDeepRight\n      )\n  \n    return fn\n  }\n  \n  export const px = when(isNumber, num => `${num  }px`)\n  \n  const css = props => props.css\n  const themed = key => props => prop(key,prop('theme',props))\n  \n  export const getWidth = ifElse(\n    either(isNotNumber, lt(1)),\n    px,\n    decimal => `${decimal * 100  }%`\n  )\n  // export const getWidth = n => (!isNumber(n) || n > 1 ? px(n) : n * 100 + \"%\");\n  export const width = responsiveP({\n    prop: 'width',\n    postFn: getWidth\n  })\n  \n  export const fontSize = responsiveP({\n    cssProp: 'fontSize',\n    key: 'fontSizes',\n    prop: 'fontSize',\n    postFn: px\n  })\n  \n  // flexbox\n  export const alignItems = responsiveP({\n    prop: 'alignItems'\n  })\n  \n  export const alignContent = responsiveP({\n    prop: 'alignContent'\n  })\n  \n  export const justifyItems = responsiveP({\n    prop: 'justifyItems'\n  })\n  \n  export const justifyContent = responsiveP({\n    prop: 'justifyContent'\n  })\n  \n  export const flexWrap = responsiveP({\n    prop: 'flexWrap'\n  })\n  \n  export const flexBasis = responsiveP({\n    prop: 'flexBasis',\n    postFn: getWidth\n  })\n  \n  export const flexDirection = responsiveP({\n    prop: 'flexDirection'\n  })\n  \n  export const flex = responsiveP({\n    prop: 'flex'\n  })\n  \n  export const justifySelf = responsiveP({\n    prop: 'justifySelf'\n  })\n  \n  export const alignSelf = responsiveP({\n    prop: 'alignSelf'\n  })\n  \n  export const order = responsiveP({\n    prop: 'order'\n  })\n  \n  export const textColor = responsiveP({\n    prop: 'color',\n    key: 'colors'\n  })\n  \n  export const bgColor = responsiveP({\n    prop: 'bg',\n    cssProp: 'backgroundColor',\n    key: 'colors'\n  })\n  \n  export const color = compose(\n    textColor,\n    bgColor\n  )\n  \n  export const padding = switchP(\n    {\n      padding: 'returnAsIs',\n      p: 'returnAsIs'\n    },\n    {\n      cssProp: 'padding',\n      key: 'sizing',\n      postFn: px\n    }\n  )\n  \n  export const paddingLeft = switchP(\n    {\n      paddingLeft: 'returnAsIs',\n      pl: 'returnAsIs',\n      px: 'returnAsIs'\n    },\n    {\n      cssProp: 'paddingLeft',\n      key: 'sizing',\n      postFn: px\n    }\n  )\n  \n  export const paddingRight = switchP(\n    {\n      paddingRight: 'returnAsIs',\n      pr: 'returnAsIs',\n      px: 'returnAsIs'\n    },\n    {\n      cssProp: 'paddingRight',\n      key: 'sizing',\n      postFn: px\n    }\n  )\n  \n  export const paddingTop = switchP(\n    {\n      paddingTop: 'returnAsIs',\n      pt: 'returnAsIs',\n      py: 'returnAsIs'\n    },\n    {\n      cssProp: 'paddingTop',\n      key: 'sizing',\n      postFn: px\n    }\n  )\n  \n  export const paddingBottom = switchP(\n    {\n      paddingBottom: 'returnAsIs',\n      pb: 'returnAsIs',\n      py: 'returnAsIs'\n    },\n    {\n      cssProp: 'paddingBottom',\n      key: 'sizing',\n      postFn: px\n    }\n  )\n  \n  export const margin = switchP(\n    {\n      margin: 'returnAsIs',\n      m: 'returnAsIs'\n    },\n    {\n      cssProp: 'margin',\n      key: 'sizing',\n      postFn: px,\n  \n    }\n  )\n  \n  export const marginLeft = switchP(\n    {\n      marginLeft: 'returnAsIs',\n      ml: 'returnAsIs',\n      mx: 'returnAsIs'\n    },\n    {\n      cssProp: 'marginLeft',\n      key: 'sizing',\n      postFn: px\n    }\n  )\n  \n  export const marginRight = switchP(\n    {\n      marginRight: 'returnAsIs',\n      mr: 'returnAsIs',\n      mx: 'returnAsIs'\n    },\n    {\n      cssProp: 'marginRight',\n      key: 'sizing',\n      postFn: px\n    }\n  )\n  \n  export const marginTop = switchP(\n    {\n      marginTop: 'returnAsIs',\n      mt: 'returnAsIs',\n      my: 'returnAsIs'\n    },\n    {\n      cssProp: 'marginTop',\n      key: 'sizing',\n      postFn: px\n    }\n  )\n  \n  export const marginBottom = switchP(\n    {\n      marginBottom: 'returnAsIs',\n      mb: 'returnAsIs',\n      my: 'returnAsIs'\n    },\n    {\n      cssProp: 'marginBottom',\n      key: 'sizing',\n      postFn: px\n    }\n  )\n  \n  export const space = compose(\n    marginTop,\n    marginBottom,\n    marginLeft,\n    marginRight,\n    margin,\n    paddingTop,\n    paddingBottom,\n    paddingRight,\n    paddingLeft,\n    padding\n  )\n  \n")),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"components"}},"components"),r.a.createElement(s.MDXTag,{name:"pre",components:n},r.a.createElement(s.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:""}},'import styled from "../../shared/styled/styled-base"\nimport { responsiveP } from "./styler";\nimport {\n  space,\n  color,\n  width,\n  height,\n  flex,\n  order,\n  alignSelf,\n  flexWrap,\n  flexDirection,\n  alignItems,\n  justifyContent,\n  fontSize,\n  fontFamily,\n  fontWeight,\n  textAlign,\n  lineHeight,\n  letterSpacing,\n  borders,\n  borderColor,\n  borderRadius,\n  buttonStyle,\n  boxShadow,\n  backgroundImage,\n  backgroundSize,\n  backgroundPosition,\n  backgroundRepeat,\n  opacity,\n} from "./styled-system";\n\nimport {path} from \'@roseys/futils\'\n\nexport const css = path(\'css\')\nexport const themed = key =>path([\'theme\',key])\n\nexport const Box = styled("div")(\n  space,\n  width,\n  fontSize,\n  color,\n  flex,\n  order,\n  alignSelf,\n  themed("Box"),\n  css\n);\n\nexport const Flex = styled(Box)(\n  {\n    display: "flex"\n  },\n  flexWrap,\n  flexDirection,\n  alignItems,\n  justifyContent,\n  themed("Flex")\n);\n\nexport const Text = styled(Box)(\n  fontFamily,\n  fontWeight,\n  textAlign,\n  lineHeight,\n  letterSpacing,\n  themed("Text")\n);\n\nexport const Heading = styled(Text)(themed("Heading"));\n\nHeading.defaultProps = {\n  as: "h2",\n  m: 0,\n  fontSize: 4,\n  fontWeight: "bold"\n};\nexport const Link = styled(Box)(themed("Link"));\n\nLink.defaultProps = {\n  as: "a",\n  color: "blue"\n};\n\nexport const Button = styled(Box)(\n  {\n    appearance: "none",\n    display: "inline-block",\n    textAlign: "center",\n    lineHeight: "inherit",\n    textDecoration: "none"\n  },\n  fontWeight,\n  borders,\n  borderColor,\n  borderRadius,\n  buttonStyle,\n  themed("Button")\n);\n\nButton.defaultProps = {\n  as: "button",\n  fontSize: "inherit",\n  fontWeight: "bold",\n  m: 0,\n  px: 3,\n  py: 2,\n  color: "white",\n  bg: "blue",\n  border: "0",\n  borderRadius: 4\n};\n\nexport const Image = styled(Box)(\n  {\n    maxWidth: "100%",\n    height: "auto"\n  },\n  height,\n  borderRadius,\n  themed("Image")\n);\n\nImage.defaultProps = {\n  as: "img",\n  m: 0\n};\n\nconst cards = responsiveP({ key: "cards", prop: "variant" });\n\nexport const Card = styled(Box)(\n  borders,\n  borderColor,\n  borderRadius,\n  boxShadow,\n  backgroundImage,\n  backgroundSize,\n  backgroundPosition,\n  backgroundRepeat,\n  opacity,\n  themed("Card"),\n  cards\n);\n')),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example-box"}},"Example Box"),r.a.createElement(a.Playground,{__position:0,__code:'<Box bg="grey" p={3}>\n  <Box bg="red">Box</Box>\n  <Box bg="white">Box</Box>\n  <Box bg="blue">Box</Box>\n</Box>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(be,{bg:"grey",p:3},r.a.createElement(be,{bg:"red"},"Box"),r.a.createElement(be,{bg:"white"},"Box"),r.a.createElement(be,{bg:"blue"},"Box"))),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example-flex"}},"Example Flex"),r.a.createElement(a.Playground,{__position:1,__code:'<Flex bg="grey" p={3}>\n  <Box bg="red">Box</Box>\n  <Box bg="white">Box</Box>\n  <Box bg="blue">Box</Box>\n</Flex>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(ye,{bg:"grey",p:3},r.a.createElement(be,{bg:"red"},"Box"),r.a.createElement(be,{bg:"white"},"Box"),r.a.createElement(be,{bg:"blue"},"Box"))),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example-card"}},"Example Card"),r.a.createElement(a.Playground,{__position:2,__code:'<Card bg="grey" p={3}>\n  <Box bg="red">Box</Box>\n  <Box bg="white">Box</Box>\n  <Box bg="blue">Box</Box>\n</Card>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(Fe,{bg:"grey",p:3},r.a.createElement(be,{bg:"red"},"Box"),r.a.createElement(be,{bg:"white"},"Box"),r.a.createElement(be,{bg:"blue"},"Box"))),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example-full"}},"Example Full"),r.a.createElement(a.Playground,{__position:3,__code:'<Text fontFamily="system-ui,sans-serif">\n  <Box px={3} py={5} color="white" bg="blue">\n    <Heading as="h1" fontSize={[4, 5, 6]}>\n      Hello, Rebass\n    </Heading>\n  </Box>\n  <Flex px={3} py={4} alignItems="center">\n    <Heading color="blue">Beep</Heading>\n    <Box mx="auto" />\n    <Button>Boop</Button>\n  </Flex>\n</Text>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(Be,{fontFamily:"system-ui,sans-serif"},r.a.createElement(be,{px:3,py:5,color:"white",bg:"blue"},r.a.createElement(ke,{as:"h1",fontSize:[4,5,6]},"Hello, Rebass")),r.a.createElement(ye,{px:3,py:4,alignItems:"center"},r.a.createElement(ke,{color:"blue"},"Beep"),r.a.createElement(be,{mx:"auto"}),r.a.createElement(Ee,null,"Boop")))),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example-two"}},"Example Two"),r.a.createElement(a.Playground,{__position:4,__code:'<Box>\n  <Flex px={4} py={4} alignItems="center">\n    <Heading fontSize={[4, 5]} color="blue">\n      Live Demo\n    </Heading>\n    <Box mx="auto" />\n    <Button>Beep</Button>\n    <Button ml={2}>Boop</Button>\n  </Flex>\n  <Box px={3} py={5} color="white" bg="blue">\n    <Heading is="h1" fontSize={[4, 5, 6]}>\n      Hello, Rebass\n    </Heading>\n  </Box>\n</Box>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(be,null,r.a.createElement(ye,{px:4,py:4,alignItems:"center"},r.a.createElement(ke,{fontSize:[4,5],color:"blue"},"Live Demo"),r.a.createElement(be,{mx:"auto"}),r.a.createElement(Ee,null,"Beep"),r.a.createElement(Ee,{ml:2},"Boop")),r.a.createElement(be,{px:3,py:5,color:"white",bg:"blue"},r.a.createElement(ke,{is:"h1",fontSize:[4,5,6]},"Hello, Rebass")))),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example-three"}},"Example Three"),r.a.createElement(a.Playground,{__position:5,__code:'<Flex px={3} py={4} alignItems="center">\n  <Heading color="blue">Beep</Heading>\n  <Box mx="auto" />\n  <Button>Boop</Button>\n</Flex>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(ye,{px:3,py:4,alignItems:"center"},r.a.createElement(ke,{color:"blue"},"Beep"),r.a.createElement(be,{mx:"auto"}),r.a.createElement(Ee,null,"Boop"))),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example4-full"}},"Example4 Full"),r.a.createElement(a.Playground,{__position:6,__code:'<Box p={5} fontSize={4} width={[1, 1, 1 / 2]} color="white" bg="magenta">\n  Box\n</Box>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(be,{p:5,fontSize:4,width:[1,1,.5],color:"white",bg:"magenta"},"Box")),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example5-full"}},"Example5 Full"),r.a.createElement(a.Playground,{__position:7,__code:'<Flex>\n  <Box p={3} width={1 / 2} color="magenta" bg="black">\n    Flex\n  </Box>\n  <Box p={3} width={1 / 2} color="white" bg="magenta">\n    Box\n  </Box>\n</Flex>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(ye,null,r.a.createElement(be,{p:3,width:.5,color:"magenta",bg:"black"},"Flex"),r.a.createElement(be,{p:3,width:.5,color:"white",bg:"magenta"},"Box"))),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example6-full"}},"Example6 Full"),r.a.createElement(a.Playground,{__position:8,__code:'<Text fontSize={[3, 4, 5]} fontWeight="bold" color="magenta">\n  Text\n</Text>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(Be,{fontSize:[3,4,5],fontWeight:"bold",color:"magenta"},"Text")),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example7-full"}},"Example7 Full"),r.a.createElement(a.Playground,{__position:9,__code:'<Image\n  width={[1, 1, 1 / 2]}\n  src="https://source.unsplash.com/random/1280x720"\n  borderRadius={8}\n/>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(we,{width:[1,1,.5],src:"https://source.unsplash.com/random/1280x720",borderRadius:8})),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example8-full"}},"Example8 Full"),r.a.createElement(a.Playground,{__position:10,__code:'<Card\n  fontSize={6}\n  fontWeight="bold"\n  width={[1, 1, 1 / 2]}\n  p={5}\n  my={5}\n  bg="#f6f6ff"\n  borderRadius={8}\n  boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"\n>\n  Hello\n</Card>',__scope:{props:t,Assistant:p.a,Box:be,Flex:ye,Heading:ke,Text:Be,Button:Ee,Link:_e,Image:we,Card:Fe}},r.a.createElement(Fe,{fontSize:6,fontWeight:"bold",width:[1,1,.5],p:5,my:5,bg:"#f6f6ff",borderRadius:8,boxShadow:"0 2px 16px rgba(0, 0, 0, 0.25)"},"Hello")))}}}]);