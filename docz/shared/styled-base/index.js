// @flow
import * as React from "react";
import type { ElementType } from "react";
import {
  getShouldForwardProp,
  testAlwaysTrue,
  pickAssign,
  type StyledOptions,
  type CreateStyled
} from "./utils";
import { withCSSContext } from "@emotion/core";
import { getRegisteredStyles, insertStyles, isBrowser } from "@emotion/utils";
import { serializeStyles } from "@emotion/serialize";

type StyledComponent = (
  props: *
) => React.Node & {
  withComponent(nextTag: ElementType, nextOptions?: StyledOptions): *
};

let createStyled: CreateStyled = (tag: any, options?: StyledOptions) => {
  if (process.env.NODE_ENV !== "production") {
    if (tag === undefined) {
      throw new Error(
        "You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it."
      );
    }
  }
  let identifierName;
  let shouldForwardProp;
  let optionsShouldForwardProp;
  let targetClassName;
  let enableAs = true;
  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
    enableAs = options.enableAs === false ? false : true;
    optionsShouldForwardProp =
      tag.__emotion_forwardProp && options.shouldForwardProp
        ? propName =>
            tag.__emotion_forwardProp(propName) &&
            // $FlowFixMe
            options.shouldForwardProp(propName)
        : options.shouldForwardProp;

    shouldForwardProp = optionsShouldForwardProp;
  }
  const isReal = tag.__emotion_real === tag;
  const baseTag = (isReal && tag.__emotion_base) || tag;

  if (typeof shouldForwardProp !== "function") {
    shouldForwardProp = getShouldForwardProp(baseTag, enableAs);
  }

  return function(): StyledComponent {
    let args = arguments;
    let styles =
      isReal && tag.__emotion_styles !== undefined
        ? tag.__emotion_styles.slice(0)
        : [];
    if (identifierName !== undefined) {
      styles.push(`label:${identifierName};`);
    }
    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {
      styles.push(args[0][0]);
      let len = args.length;
      let i = 1;
      for (; i < len; i++) {
        styles.push(args[i], args[0][i]);
      }
    }

    const Styled: any = withCSSContext((props, context) => {
      const finalTag = enableAs ? props.as || baseTag : baseTag;
      let className = "";
      let classInterpolations = [];
      let mergedProps = pickAssign(testAlwaysTrue, {}, props, {
        theme: props.theme || context.theme
      });
      if (typeof props.className === "string") {
        className += getRegisteredStyles(
          context.registered,
          classInterpolations,
          props.className
        );
      }
      const serialized = serializeStyles(
        context.registered,
        styles.concat(classInterpolations),
        mergedProps
      );
      const rules = insertStyles(
        context,
        serialized,
        typeof finalTag === "string"
      );
      className += `${context.key}-${serialized.name}`;
      if (targetClassName !== undefined) {
        className += ` ${targetClassName}`;
      }

      const finalShouldForwardProp = props.as
        ? optionsShouldForwardProp || getShouldForwardProp(finalTag)
        : shouldForwardProp;

      const ele = React.createElement(
        finalTag,
        // $FlowFixMe
        pickAssign(finalShouldForwardProp, {}, props, {
          className,
          ref: props.innerRef
        })
      );

      if (!isBrowser && rules !== undefined) {
        return (
          <React.Fragment>
            <style
              {...{
                [`data-emotion-${context.key}`]: serialized.name,
                dangerouslySetInnerHTML: { __html: rules },
                nonce: context.sheet.nonce
              }}
            />
            {ele}
          </React.Fragment>
        );
      }
      return ele;
    });

    Styled.displayName =
      identifierName !== undefined
        ? identifierName
        : `Styled(${
            typeof baseTag === "string"
              ? baseTag
              : baseTag.displayName || baseTag.name || "Component"
          })`;
    let FinalStyled = process.env.PREACT
      ? Styled
      : // $FlowFixMe
        React.forwardRef((props, ref) => {
          // this avoids creating a new object if there's no ref
          return (
            <Styled
              {...(ref === null
                ? props
                : pickAssign(testAlwaysTrue, { innerRef: ref }, props))}
            />
          );
        });

    FinalStyled.__emotion_real = FinalStyled;
    FinalStyled.__emotion_base = baseTag;
    FinalStyled.__emotion_styles = styles;
    FinalStyled.__emotion_forwardProp = shouldForwardProp;

    Object.defineProperty(FinalStyled, "toString", {
      enumerable: false,
      value() {
        if (
          targetClassName === undefined &&
          process.env.NODE_ENV !== "production"
        ) {
          return "NO_COMPONENT_SELECTOR";
        }
        // $FlowFixMe
        return `.${targetClassName}`;
      }
    });

    FinalStyled.withComponent = (
      nextTag: ElementType,
      nextOptions?: StyledOptions
    ) => {
      return createStyled(
        nextTag,
        nextOptions !== undefined
          ? pickAssign(testAlwaysTrue, {}, options || {}, nextOptions)
          : options
      )(...styles);
    };
    return FinalStyled;
  };
};

export default createStyled;
