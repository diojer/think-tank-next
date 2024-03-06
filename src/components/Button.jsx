import React from "react";
import "./Button.css";
import Link from "next/link";

const STYLES = [
  "btn--primary",
  "btn--secondary",
  "btn--third",
  "btn--red",
  "btn--fourth",
  "btn--blue",
];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  path,
  buttonStyle,
  buttonSize,
  onClick,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  return (
    <>
      {path ? (
        <Link href={path}>
          <button className={`btn ${checkButtonStyle} ${checkButtonSize} `}>
            {children}
          </button>
        </Link>
      ) : onClick ? (
        <button
          type={type}
          className={`btn ${checkButtonStyle} ${checkButtonSize} `}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <button
          type={type}
          className={`btn ${checkButtonStyle} ${checkButtonSize} `}
        >
          {children}
        </button>
      )}
    </>
  );
};
