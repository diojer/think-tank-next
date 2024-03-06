import React from "react";
import "./ImageButton.css";
// import LazyBackgroundImage from "../utility/LazyBackgroundLoading/LazyBackgroundImage";
import Image from "next/image";
import Link from "next/link";

const SHAPES = ["imgb--rect", "imgb--square", "imgb--thin"]; //Array of possible shapes

export const ImageButton = ({
  children,
  image,
  shape,
  color,
  path,
  newTab,
}) => {
  const checkShape = SHAPES.includes(shape) ? shape : SHAPES[0]; //Defaults to first shape if I mistype/don't specify
  return (
    <>
      {newTab ? ( //Rendering a new tab uses <a>
        <a
          href={path}
          target="_blank"
          className={`image-button-link ${checkShape}`}
        >
          <div
            src={`${image}`}
            className={`image-button ${checkShape}`}
            style={{
              backgroundColor: `${color}`,
              backgroundImage: `url("${image}")`
            }}
          >
            <p className="image-button-text">{children}</p>
          </div>
        </a>
      ) : (
        //If it's not opening a new page, I use <Link>.
        <Link href={path} className={`image-button-link ${checkShape}`}>
          <div
            className={`image-button ${checkShape}`}
            width="1000"
            height="1000"
            style={{
              backgroundColor: `${color}`,
              backgroundImage: `url("${image}")`
            }}
          >
            <p className="image-button-text">{children}</p>
          </div>
        </Link>
      )}
    </>
  );
};
