import React from "react";
import "./ShowArticle.css";
import { TitleBox } from "../../../components/TitleBox";
import parse, { attributesToProps } from "html-react-parser";
import ShareBar from "@/components/ShareBar";
import { headers } from "next/headers";
import Posts from "@/app/models/Posts";

//API calls
import { getById, index } from "@/lib/routes";
import { revalidateTag } from "next/cache";

export async function generateStaticParams() {
  const articles = await Posts.findAll({ where: { type: "article" } });
  return articles.map((article) => ({
    id: article.slug.toString(),
  }));
}

export const dynamicParams = true

export async function generateMetadata( {params} ) {
  const { id } = params;
  revalidateTag("/posts/article");
  const article = await getById("/posts/articles", id);
  const imgURL = `${process.env.APP_PUBLIC_URL}${article.bannerImage}`
  return {
    title: article.title,
    creator: article.author,
    openGraph: {
      images: [imgURL],
      url: `https://www.leedspolicyinstitute.org.uk/articles/${article.slug}`,
      type: "article"
    },
    twitter: {
      image: [imgURL]
    }
  }
}

export default async function ShowArticle({ params }) {
  // Get article id
  const { id } = params;
  revalidateTag("/posts/article");
  const article = await getById("/posts/articles", id);

  // window.location.href alternative (can't do that in server components)
  const heads = headers();
  const shareUrl = process.env.APP_URL + heads.get("next-url");

  const getTime = () => {
    const articleCreatedAt = new Date(article.createdAt);
    let timeNow = new Date();
    const diffMins = Math.floor(Math.abs(timeNow - articleCreatedAt) / (1000 * 60));
    // Set the time based on time difference
    if (diffMins < 60) {
      return `${diffMins} minute(s) ago.`;
    } else if (diffMins < 60 * 24) {
      const diffHours = Math.floor(diffMins / 60)
      return `${diffHours} hours(s) ago.`;
    } else if (diffMins < 60 * 24 * 7) {
      const diffDays = Math.floor(diffMins / (60 * 24))
      return `${diffDays} day(s) ago.`;
    } else if (diffMins < 60 * 24 * 7 * 4) {
      const diffWeeks = Math.floor(diffMins / (60 * 24 * 7))
      return `${diffWeeks} week(s) ago.`;
    } else if (diffMins < 60 * 24 * 7 * 4 * 12) {
      const diffMonths = Math.floor(diffMins / (60 * 24 * 7 * 4))
      return `${diffMonths} month(s) ago.`;
    } else {
      const diffYears = Math.floor(diffMins / (60 * 24 * 7 * 4 * 12))
      return `${diffYears} year(s) ago.`;
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
                By <a>{article.author}</a> • Published {time}
              </p>
              <ShareBar shareUrl={shareUrl} article={article} />
              <div className="selected-article-content">
                {article && parse(String(article.content))}
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
