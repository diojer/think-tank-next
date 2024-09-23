import React from "react";
import "./SponsorCard.css";
import Link from "next/link";
import Image from "next/image";

export const SponsorCard = ({
  subject,
  thumbnail,
  title,
  author,
  path,
  linkProps,
}) => {
  //We need to develop a function that searches the database for similar articles and pushes them to a suggestList variable
  return (
    <div className="sponsor-card-whole">
      <div className="sponsor-card">
        <p className="sponsor-subject">{subject}</p>
        <div className="sponsor-thumbnail-wrapper" alt="Article Thumbnail">
          <Image
            src={`${thumbnail}`}
            fill
            objectFit="contain"
            className="article-thumbnail"
          />
        </div>
        {path ? (
          <Link href={path} className="sponsor-card-title" {...linkProps}>
            <p className="sponsor-card-headlines">{title}</p>
          </Link> //Modelled after the Carnegie Endowment webite, only the text is a hyperlink, image, etc. isn't clickable
        ) : (
          <p className="sponsor-card-title">{title}</p>
        )}
        <p className="sponsor-author">{author}</p>
        {/* <p className="article-type">{type}</p> */}
      </div>
      <div className="suggested">
        {/* <p className="suggested-subject">More on {subject}...</p> */}
        {/* <hr /> */}
        {/* <div className="suggested-list">{suggestList}</div> */}
      </div>
    </div>
  );
};
