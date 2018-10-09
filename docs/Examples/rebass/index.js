import styled from "../../shared/styled/styled-base"
import { responsiveP } from "./styler";
import {
  space,
  color,
  width,
  height,
  flex,
  order,
  alignSelf,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  fontSize,
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  borders,
  borderColor,
  borderRadius,
  buttonStyle,
  boxShadow,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  opacity,
} from "./styles";
 
import {path} from '@roseys/futils'

export const css = path('css')
export const themed = key =>path(['theme',key])

export const Box = styled("div")(
  space,
  width,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  themed("Box"),
  css
);

export const Flex = styled(Box)(
  {
    display: "flex"
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  themed("Flex")
);

export const Text = styled(Box)(
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  themed("Text")
);

export const Heading = styled(Text)(themed("Heading"));

Heading.defaultProps = {
  as: "h2",
  m: 0,
  fontSize: 4,
  fontWeight: "bold"
};
export const Link = styled(Box)(themed("Link"));

Link.defaultProps = {
  as: "a",
  color: "blue"
};

export const Button = styled(Box)(
  {
    appearance: "none",
    display: "inline-block",
    textAlign: "center",
    lineHeight: "inherit",
    textDecoration: "none"
  },
  fontWeight,
  borders,
  borderColor,
  borderRadius,
  buttonStyle,
  themed("Button")
);

Button.defaultProps = {
  as: "button",
  fontSize: "inherit",
  fontWeight: "bold",
  m: 0,
  px: 3,
  py: 2,
  color: "white",
  bg: "blue",
  border: "0",
  borderRadius: 4
};

export const Image = styled(Box)(
  {
    maxWidth: "100%",
    height: "auto"
  },
  height,
  borderRadius,
  themed("Image")
);

Image.defaultProps = {
  as: "img",
  m: 0
};

const cards = responsiveP({ key: "cards", prop: "variant" });

export const Card = styled(Box)(
  borders,
  borderColor,
  borderRadius,
  boxShadow,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  opacity,
  themed("Card"),
  cards
);
