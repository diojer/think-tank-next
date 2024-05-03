import "./ArticleCard.css";
import "./MediaCard.css";
import Link from "next/link";
import Image from "next/image";

export default function MediaCard({ subject, thumbnail, title, type, author, path, description }) {
  // We need to develop a function that searches the database for similar articles and pushes them to a suggestList variable
  return (
    <div className="article-card-whole">
      <div className="article-card">
        <p className="article-subject">{subject}</p>
        <div className="article-thumbnail-wrapper" alt="Article Thumbnail">
          <Image
            src={`${thumbnail}`}
            fill
            objectFit="cover"
            className="article-thumbnail"
          />
        </div>
        {path ? (
          <Link href={path} className="article-card-title">
            <p className="article-card-headlines">{title}</p>
          </Link> // Modelled after the Carnegie Endowment webite, only the text is a hyperlink, image, etc. isn't clickable
        ) : (
          <p className="article-card-title">{title}</p>
        )}
        {/* <p className="article-type">{type}</p> */}
      </div>
      <div className="description-wrapper">
        <p className="media-description">{description}</p>
      </div>
    </div>
  );
}
