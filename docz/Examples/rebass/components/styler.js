import Assistant from "style-assistant";
import config from "./assistantConfig";

export const {
  pxToRem,
  pxToEm,
  pxToPct,
  pxToRelative,
  normalize,
  normalizeToEm,
  normalizeToRem,
  toMq,
  parse,
  getDefaultTheme,
  mergeDefaultTheme,
  getTheme,
  getThemeWithFallbackKey,
  getThemeOr,
  responsiveP, //using alias to match styled-system
  responsiveBoolProp,
  switchP,
  transformStyle
} = new Assistant(config);
