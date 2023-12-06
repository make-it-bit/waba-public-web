import React from "react";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

const Tag = ({ text, svg = false }) => {
  return (
    <div
      className={classNames(
        "flex items-center bg-transparent border rounded-40 border-black-100 px-16 py-4",
        svg && "gap-8"
      )}
    >
      {svg && <ReactSVG src="/logos/eu.svg" className="inline-block" />}
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default Tag;
