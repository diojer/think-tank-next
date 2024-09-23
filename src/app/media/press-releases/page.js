import React from "react";
import "./press-releases.css";
import "@/app/articles/Articles.css";
import MediaCard from "@/components/MediaCard";
import { TitleBox } from "@/components/TitleBox";
import { revalidateTag } from "next/cache";
import { index } from "@/lib/routes";

async function PressRelease() {
  revalidateTag("/posts/press-release");
  const pressReleases = await index("/posts/press-release");
  let filled = false;
  if (pressReleases.length > 0) {
    filled = true
  }
  return (
    <>
      <TitleBox
        image="/images/titleboxes/press-release.jpg"
        type="bottom"
        color="#2e2d2b"
        font="white"
      >
        Press Releases<span className="hilite">.</span>
      </TitleBox>
      {filled ? <div className="articles-aligner">
        <div className="articles-column">
          <div className="articles-wrapper">
            {pressReleases.map((pressRelease, key) => (
              <MediaCard
                key={key}
                subject={pressRelease.subject}
                thumbnail={`${process.env.APP_PUBLIC_URL}${pressRelease.cardImage}`}
                title={pressRelease.title}
                type="Article"
                author={pressRelease.author}
                path={`press-releases/${pressRelease.slug}`}
                description={pressRelease.byline}
              />
            ))}
          </div>
        </div>
      </div> : <div className="WIP-wrapper">
        <div className="WIP-message">
          <p className="WIP-message-title">
            We have no public press release information at the moment.
          </p>
          <p className="WIP-message-text">
            Please check again later.
          </p>
          <p className="WIP-message-text">
            If you have received an advanced press release from us, access it through the link in your <b>email</b>.
          </p>
        </div>
      </div>}

    </>
  );
}

export default PressRelease;
