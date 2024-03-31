import React from "react";
import Head from "next/head";
import { ArticleCard } from "@/components/ArticleCard";
import { TitleBox } from "@/components/TitleBox";
import "./Articles.css";

//API calls
import { indexArticles } from "@/lib/articles";

export default async function Articles() {
  const articles = await indexArticles();
  return (
    <>
      <>
        <TitleBox
          image="/images/titleboxes/articles.jpg"
          color="#2e2d2b"
          font="white"
        >
          Articles<span className="hilite">.</span>
        </TitleBox>
        <div className="articles-aligner">
          <div className="articles-column">
            <div className="articles-wrapper">
              {articles.data.map((article, key) => (
                <ArticleCard
                  key={key}
                  subject={article.subject}
                  thumbnail={`${process.env.APP_PUBLIC_URL}${article.cardImage}`}
                  title={article.title}
                  type="Article"
                  author={article.author}
                  path={`articles/${article.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    </>
  );
}
