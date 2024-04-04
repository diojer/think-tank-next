import React from "react";
import "./ShowArticle.css";
import { TitleBox } from "../../../components/TitleBox";
import parse, { attributesToProps } from "html-react-parser";
import ShareBar from "@/components/ShareBar";
import { headers } from "next/headers";

//API calls
import { getById, index } from "@/lib/routes";

export async function generateStaticParams() {
  const articles = await index("/articles");
  return articles.map((article) => ({
    id: article.id.toString(),
  }));
}

export default async function ShowArticle({ params }) {
  // Get article id
  const { id } = params;
  const article = await getById("/articles", id);

  // window.location.href alternative (can't do that in server components)
  const heads = headers();
  const shareUrl = heads.get("next-url");

  const getTime = () => {
    const articleCreatedAt = new Date(article.created_at);
    const timeNow = new Date();
    // Calculate time difference in seconds
    let timeDifference = Math.floor(
      Math.abs(articleCreatedAt - timeNow) / 36e5
    );
    // Set the time based on time difference
    if (timeDifference < 24) {
      return `${timeDifference} hour(s) ago.`;
    } else if (timeDifference < 30 * 24) {
      timeDifference = Math.round(timeDifference / 24);
      return `${timeDifference} day(s) ago.`;
    } else if (timeDifference < 365 * 12) {
      timeDifference = Math.round(timeDifference / 30);
      return `${timeDifference} month(s) ago.`;
    } else {
      timeDifference = Math.round(timeDifference / 365);
      return `${timeDifference} year(s) ago.`;
    }
  };

  const time = getTime();
  return (
    <>
      {article ? (
        <>
          <TitleBox
            image={`${process.env.APP_PUBLIC_URL}${article.bannerImage}`}
            color="#2e2d2b"
            font="white"
            type="center"
            textType="center"
            height="300px"
          />
          <div className="selected-article-wrapper">
            <div className="selected-article-column">
              <p className="selected-article-title">{article.title}</p>
              <p className="selected-article-byline">{article.byline}</p>
              <p className="selected-article-author">
                Published by <a>{article.author}</a> {time}
              </p>
              <ShareBar shareUrl={shareUrl} article={article} />
              <div className="selected-article-content">
                {article && parse(article.content)}
              </div>
            </div>
          </div>
          <div className="article-disclosure">
            <p className="article-disclosure-text">
              All articles and opinions posted give the views of the author(s)
              and do not necessarily reflect the views of the Leeds Think Tank,
              the Leeds University Union, or the University of Leeds.
            </p>
          </div>
        </>
      ) : (
        <>
          <TitleBox
            image="/images/articles/greybox.png"
            textType="center"
            height="300px"
          >
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </TitleBox>
          <div className="selected-article-wrapper">
            <p className="selected-article-title"> </p>
            <p className="selected-article-byline"> </p>
            <p className="selected-article-author"> </p>
            <p className="center">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </p>
          </div>
        </>
      )}
    </>
  );
}
