"use client";

import React from "react";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

const Button = ({
  CTA,
  type = "button",
  style = "primary",
  size = "reg",
  onClick,
  disabled = false,
  svg = true,
  inlineMaxWidthBreakpoint = undefined,
  blockMaxWidthBreakpoint = undefined,
  btnBlock = false,
}) => {
  const styleMap = {
    primary:
      "text-white-100 bg-black-100 hover:bg-deep-purple-100 active:bg-deep-purple-80 disabled:bg-black-60 focus:bg-black-100 focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-black-100",
    secondary:
      "text-black-100 disabled:text-black-60 bg-transparent hover:bg-black-10 active:bg-black-5 disabled:bg-transparent focus:bg-transparent focus:outline focus:outline-2 focus:outline-black-100",
    tertiary:
      "text-white-100 bg-deep-purple-100 hover:bg-deep-purple-80 active:bg-deep-purple-60 disabled:bg-deep-purple-40 focus:bg-deep-purple-100 focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-black-100",
    quaternary:
      "text-white-100 disabled:text-white-60 bg-transparent hover:bg-white-10 active:bg-white-5 disabled:bg-transparent focus:bg-transparent focus:outline focus:outline-2 focus:outline-white-100",
  }[style];

  let buttonCaret = "";
  if (style === "primary") {
    buttonCaret = "icons/caret-right-white-100.svg";
  } else if (style === "secondary" && !disabled) {
    buttonCaret = "icons/caret-right-black-100.svg";
  } else if (style === "secondary" && disabled) {
    buttonCaret = "icons/caret-right-black-60.svg";
  } else if (style === "tertiary") {
    buttonCaret = "icons/caret-right-white-100.svg";
  } else if (style === "quaternary" && !disabled) {
    buttonCaret = "icons/caret-right-white-100.svg";
  } else if (style === "quaternary" && disabled) {
    buttonCaret = "icons/caret-right-white-60.svg";
  }

  const sizeMap = { sm: "px-16 py-[1px]", reg: "px-24 py-8" }[size];

  const inlineMaxWidthBreakpointMap = {
    xs: "btn-inline-block-xs",
    sm: "btn-inline-block-sm",
    md: "btn-inline-block-md",
    lg: "btn-inline-block-lg",
    xl: "btn-inline-block-xl",
  }[inlineMaxWidthBreakpoint];

  const blockMaxWidthBreakpointMap = {
    xs: "btn-block-xs",
    sm: "btn-block-sm",
    md: "btn-block-md",
    lg: "btn-block-lg",
    xl: "btn-block-xl",
  }[blockMaxWidthBreakpoint];

  return (
    <button
      className={classNames(
        styleMap,
        sizeMap,
        inlineMaxWidthBreakpointMap,
        blockMaxWidthBreakpointMap,
        btnBlock && "block",
        svg && "flex items-center gap-8",
        "relative justify-center text-base leading-base"
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {CTA}
      {svg && (
        <ReactSVG
          src={buttonCaret}
          className="cursor-pointer"
          beforeInjection={(svg) => {
            svg.classList.add("block");
          }}
        />
      )}
    </button>
  );
};

export default Button;
