import { responsiveP, switchP } from "./styler";
import {flow,whenFunctionCallWith,map,mergeAllDeepRight,compact, path} from '@roseys/futils'

export const css = path('css')
export const themed = key =>path(['theme',key])

/// From styled-system
export const num = n => typeof n === "number" && !isNaN(n);
export const px = n => (num(n) ? n + "px" : n);

export const compose = (...funcs) => {
  const fn = props =>
    flow(
      funcs,
      map(whenFunctionCallWith(props)),
      compact,
      mergeAllDeepRight
    )

  return fn
}

export const getWidth = n => (!num(n) || n > 1 ? px(n) : n * 100 + "%");
export const width = responsiveP({
  prop: "width",
  postFn: getWidth
});

export const fontSize = responsiveP({
  cssProp: "fontSize",
  key: "fontSizes",
  prop: "fontSize",
  postFn: px,
  transform: true
});

export const textColor = responsiveP({
  prop: "color",
  key: "colors"
});

export const bgColor = responsiveP({
  prop: "bg",
  cssProp: "backgroundColor",
  key: "colors"
});

export const color = compose(
  textColor,
  bgColor
);

// typography
export const fontFamily = responsiveP({
  prop: "fontFamily",
  key: "fonts"
});

export const textAlign = responsiveP({
  prop: "textAlign"
});

export const lineHeight = responsiveP({
  prop: "lineHeight",
  key: "lineHeights"
});

export const fontWeight = responsiveP({
  prop: "fontWeight",
  key: "fontWeights"
});

export const fontStyle = responsiveP({
  prop: "fontStyle"
});

export const letterSpacing = responsiveP({
  prop: "letterSpacing",
  key: "letterSpacings",
  postFn: px
});

// layout
export const display = responsiveP({
  prop: "display"
});

export const maxWidth = responsiveP({
  prop: "maxWidth",
  key: "maxWidths",
  postFn: px
});

export const minWidth = responsiveP({
  prop: "minWidth",
  key: "minWidths",
  postFn: px
});

export const height = responsiveP({
  prop: "height",
  key: "heights",
  postFn: px
});

export const maxHeight = responsiveP({
  prop: "maxHeight",
  key: "maxHeights",
  postFn: px
});

export const minHeight = responsiveP({
  prop: "minHeight",
  key: "minHeights",
  postFn: px
});

export const sizeWidth = responsiveP({
  prop: "size",
  cssProp: "width",
  postFn: px
});

export const sizeHeight = responsiveP({
  prop: "size",
  cssProp: "height",
  postFn: px
});

export const size = compose(
  sizeHeight,
  sizeWidth
);

export const ratioPadding = responsiveP({
  prop: "ratio",
  cssProp: "paddingBottom",
  postFn: n => n * 100 + "%"
});

export const ratio = props =>
  props.ratio
    ? {
        height: 0,
        ...ratioPadding(props)
      }
    : null;
ratio.propTypes = {
  ...ratioPadding.propTypes
};

export const verticalAlign = responsiveP({
  prop: "verticalAlign"
});

// flexbox
export const alignItems = responsiveP({
  prop: "alignItems"
});

export const alignContent = responsiveP({
  prop: "alignContent"
});

export const justifyItems = responsiveP({
  prop: "justifyItems"
});

export const justifyContent = responsiveP({
  prop: "justifyContent"
});

export const flexWrap = responsiveP({
  prop: "flexWrap"
});

export const flexBasis = responsiveP({
  prop: "flexBasis",
  postFn: getWidth
});

export const flexDirection = responsiveP({
  prop: "flexDirection"
});

export const flex = responsiveP({
  prop: "flex"
});

export const justifySelf = responsiveP({
  prop: "justifySelf"
});

export const alignSelf = responsiveP({
  prop: "alignSelf"
});

export const order = responsiveP({
  prop: "order"
});

// grid
export const gridGap = responsiveP({
  prop: "gridGap",
  postFn: px,
  key: "space"
});

export const gridColumnGap = responsiveP({
  prop: "gridColumnGap",
  postFn: px,
  key: "space"
});

export const gridRowGap = responsiveP({
  prop: "gridRowGap",
  postFn: px,
  key: "space"
});

export const gridColumn = responsiveP({
  prop: "gridColumn"
});

export const gridRow = responsiveP({
  prop: "gridRow"
});

export const gridAutoFlow = responsiveP({
  prop: "gridAutoFlow"
});

export const gridAutoColumns = responsiveP({
  prop: "gridAutoColumns"
});

export const gridAutoRows = responsiveP({
  prop: "gridAutoRows"
});

export const gridTemplateColumns = responsiveP({
  prop: "gridTemplateColumns"
});

export const gridTemplateRows = responsiveP({
  prop: "gridTemplateRows"
});

export const gridTemplateAreas = responsiveP({
  prop: "gridTemplateAreas"
});

export const gridArea = responsiveP({
  prop: "gridArea"
});

// borders
const getBorder = n => (num(n) && n > 0 ? n + "px solid" : n);

export const border = responsiveP({
  prop: "border",
  key: "borders",
  postFn: getBorder
});

export const borderTop = responsiveP({
  prop: "borderTop",
  key: "borders",
  postFn: getBorder
});

export const borderRight = responsiveP({
  prop: "borderRight",
  key: "borders",
  postFn: getBorder
});

export const borderBottom = responsiveP({
  prop: "borderBottom",
  key: "borders",
  postFn: getBorder
});

export const borderLeft = responsiveP({
  prop: "borderLeft",
  key: "borders",
  postFn: getBorder
});

export const borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft
);

export const borderColor = responsiveP({
  prop: "borderColor",
  key: "colors"
});

export const borderRadius = responsiveP({
  prop: "borderRadius",
  key: "radii",
  postFn: px
});

export const boxShadow = responsiveP({
  prop: "boxShadow",
  key: "shadows"
});

export const opacity = responsiveP({
  prop: "opacity"
});

export const overflow = responsiveP({
  prop: "overflow"
});

// backgrounds
export const background = responsiveP({
  prop: "background"
});

export const backgroundImage = responsiveP({
  prop: "backgroundImage"
});

export const backgroundSize = responsiveP({
  prop: "backgroundSize"
});

export const backgroundPosition = responsiveP({
  prop: "backgroundPosition"
});

export const backgroundRepeat = responsiveP({
  prop: "backgroundRepeat"
});

// position
export const position = responsiveP({
  prop: "position"
});

export const zIndex = responsiveP({
  prop: "zIndex"
});

export const top = responsiveP({
  prop: "top",
  postFn: px
});

export const right = responsiveP({
  prop: "right",
  postFn: px
});

export const bottom = responsiveP({
  prop: "bottom",
  postFn: px
});

export const left = responsiveP({
  prop: "left",
  postFn: px
});

export const padding = switchP(
  {
    padding: "returnAsIs",
    p: "returnAsIs"
  },
  {
    cssProp: "padding",
    key: "space",
    postFn: px
  }
);

export const paddingLeft = switchP(
  {
    paddingLeft: "returnAsIs",
    pl: "returnAsIs",
    px: "returnAsIs"
  },
  {
    cssProp: "paddingLeft",
    key: "space",
    postFn: px
  }
);

export const paddingRight = switchP(
  {
    paddingRight: "returnAsIs",
    pr: "returnAsIs",
    px: "returnAsIs"
  },
  {
    cssProp: "paddingRight",
    key: "space",
    postFn: px
  }
);

export const paddingTop = switchP(
  {
    paddingTop: "returnAsIs",
    pt: "returnAsIs",
    py: "returnAsIs"
  },
  {
    cssProp: "paddingTop",
    key: "space",
    postFn: px
  }
);

export const paddingBottom = switchP(
  {
    paddingBottom: "returnAsIs",
    pb: "returnAsIs",
    py: "returnAsIs"
  },
  {
    cssProp: "paddingBottom",
    key: "space",
    postFn: px
  }
);

export const margin = switchP(
  {
    margin: "returnAsIs",
    m: "returnAsIs"
  },
  {
    cssProp: "margin",
    key: "space",
    postFn: px
  }
);

export const marginLeft = switchP(
  {
    marginLeft: "returnAsIs",
    ml: "returnAsIs",
    mx: "returnAsIs"
  },
  {
    cssProp: "marginLeft",
    key: "space",
    postFn: px
  }
);

export const marginRight = switchP(
  {
    marginRight: "returnAsIs",
    mr: "returnAsIs",
    mx: "returnAsIs"
  },
  {
    cssProp: "marginRight",
    key: "space",
    postFn: px
  }
);

export const marginTop = switchP(
  {
    marginTop: "returnAsIs",
    mt: "returnAsIs",
    my: "returnAsIs"
  },
  {
    cssProp: "marginTop",
    key: "space",
    postFn: px
  }
);

export const marginBottom = switchP(
  {
    marginBottom: "returnAsIs",
    mb: "returnAsIs",
    my: "returnAsIs"
  },
  {
    cssProp: "marginBottom",
    key: "space",
    postFn: px
  }
);

export const space = compose(
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  margin,
  paddingTop,
  paddingBottom,
  paddingRight,
  paddingLeft,
  padding
);

export const buttonStyle = responsiveP({
  key: "buttons",
  prop: "variant"
});
export const textStyle = responsiveP({
  prop: "textStyle",
  key: "textStyles"
});
export const colorStyle = responsiveP({
  prop: "colors",
  key: "colorStyles"
});
