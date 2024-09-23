import "./ArticleCard.css";
import "./ReportCard.css";
import Link from "next/link";
import Image from "next/image";

export default function ReportCard({ subject, thumbnail, title, author, path, description }) {
  const descriptionSliced = description.slice(0, 192) + "...";
  // We need to develop a function that searches the database for similar articles and pushes them to a suggestList variable
  return (
    <div className="report-card-whole">
      <div className="report-card">
        <p className="report-subject">{subject}</p>
        <div className="report-thumbnail-wrapper" alt="Report Thumbnail">
          <Image
            src={`${thumbnail}`}
            fill
            objectFit="contain"
            className="report-thumbnail"
          />
        </div>

        <Link href={path} className="article-card-title">
          <p className="report-card-headlines">{title}</p>
        </Link> {/*/ Modelled after the Carnegie Endowment webite, only the text is a hyperlink, image, etc. isn't clickable*/}

        {/* <p className="article-type">{type}</p> */}
      </div>
      <div className="description-wrapper">
        <p className="report-description">{descriptionSliced}</p>
      </div>
    </div>
  );
}
