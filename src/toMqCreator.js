import {
  map,
  mapKeys,
  test,
  always,
  both,
  equals,
  toPairs,
  is,
  identity,
  join,
  pipe,
  flow,
  T,
  when,
  cond,
  either,
  propOr,
  toKebabCase
} from "@roseys/futils";
import { isAtRule } from "./utils";

const isDimension = test(/[height|width]$/);

const replaceShorthandKeys = mapKeys(x =>
  propOr(x, x, {
    min: "min-width",
    max: "max-width",
    minW: "min-width",
    maxW: "max-width",
    minH: "min-height",
    maxH: "max-height"
  })
);

const objParserCreator = pxToEm => obj => {
  const fn = ([feature, value]) => {
    feature = toKebabCase(feature);
    return flow(
      value,
      when(both(always(isDimension(feature)), is("Number")), pxToEm),
      cond([
        [equals(true), always(feature)],
        [equals(false), always(`not ${feature}`)],
        [T, temp => `(${feature}:${temp})`]
      ])
    );
  };

  return flow(
    obj,
    replaceShorthandKeys,
    toPairs,
    map(fn),
    join(" and ")
  );
};

const toMQCreator = pxToEm => {
  const objParser = objParserCreator(pxToEm);

  const toMq = pipe(
    cond([
      [both(is("String"), isAtRule), identity],
      [
        is("Array"),
        pipe(
          map(objParser),
          join(", ")
        )
      ],
      [
        either(is("String"), is("Number")),
        pipe(
          pxToEm,
          x => ({ screen: true, minWidth: x }),
          objParser
        )
      ],
      [T, objParser]
    ]),
    x => `@media ${x}`
  );

  return toMq;
};

export default toMQCreator;
