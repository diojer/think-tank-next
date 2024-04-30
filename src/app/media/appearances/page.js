import React from "react";
import "./appearances.css";
import "@/app/articles/Articles.css";
import { TitleBox } from "@/components/TitleBox";
import MediaCard from "@/components/MediaCard";
import { revalidateTag } from "next/cache";

//API calls
import { index } from "@/lib/routes";


async function MediaAppearances() {
  revalidateTag("/posts/media-appearance");
  const mediaApps = await index("/posts/media-appearance");
  let filled = false;
  if (mediaApps.length > 0) {
    filled = true
  }
  return (
    <>
      <TitleBox
        image="/images/titleboxes/media-appearances.jpg"
        type="bottom"
        color="#2e2d2b"
        font="white"
      >
        Media Appearances<span className="hilite">.</span>
      </TitleBox>
      {filled ? <div className="articles-aligner">
        <div className="articles-column">
          <div className="articles-wrapper">
            {mediaApps.map((mediaApp, key) => (
              <MediaCard
                key={key}
                subject={mediaApp.subject}
                thumbnail={`${process.env.APP_PUBLIC_URL}${mediaApp.cardImage}`}
                title={mediaApp.title}
                type="Article"
                author={mediaApp.author}
                path={`appearances/${mediaApp.slug}`}
                description={mediaApp.byline}
              />
            ))}
          </div>
        </div>
      </div> : <div className="mediaAp-wrapper WIP-wrapper">
        <div className="WIP-message">
          <p className="WIP-message-title">
            We have no media appearances at the moment.
          </p>
          <p className="WIP-message-text">
            Please check again later! If you are interested in publishing one of
            our articles, please see our contact details at the bottom of the
            page.
          </p>
        </div>
      </div>}
    </>
  );
}

export default MediaAppearances;
