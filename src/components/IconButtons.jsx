import React from "react";
import IconButton from "@/components/IconButton";

export default function IconButtons({ contents, colors, linkProps }) {
  return (
    <div className="icon-buttons-wrapper">
      {contents.map((content, i) => {
        return (
          <IconButton
            key={i}
            color={colors[i]}
            linkProps={linkProps[i]}
            title={content.title}
            icon={content.icon}
          >
            {content.text}
          </IconButton>
        );
      })}
    </div>
  );
}
