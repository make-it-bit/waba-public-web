import React from "react";
import Image from "next/image";
import classNames from "classnames";

const FoundationCard = ({
  icon,
  title,
  content,
  leftBorder = false,
  rightBorder = false,
  paddingMargin = "",
}) => {
  return (
    <div
      className={classNames(
        "flex flex-col items-center text-center gap-24 text-black-100 h-full",
        leftBorder && "border-l border-black-100",
        rightBorder && "border-r border-black-100",
        paddingMargin
      )}
    >
      <Image src={icon} alt="icon" width={56} height={56} />
      <h1 className="font-rufina text-3xl leading-3xl">{title}</h1>
      <p className="text-sm leading-sm">{content}</p>
    </div>
  );
};

export default FoundationCard;
