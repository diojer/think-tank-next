import Link from "next/link";
import React from "react";
import "./IconButton.css";
import { Button } from "./Button";

export default function IconButton({
  children,
  icon,
  color,
  title,
  linkProps,
}) {
  return (
    <Link {...linkProps} className="icon-button-link">
      <div className="icon-button" style={{ backgroundColor: `${color}` }}>
        <div className="icon-button-icon-wrapper">
          <p className="icon-button-icon-text">{icon}</p>
        </div>
        <div className="icon-button-text-wrapper">
          <p className="icon-button-title">{title}</p>
          <p className="icon-button-text">{children}</p>
        </div>
      </div>
    </Link>
  );
}
