import React from "react";
import "./Home.css";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Button } from "@/components/Button";
import { ImageButtons } from "@/components/ImageButtons";
import { ArticleCard } from "@/components/ArticleCard";
// import { EmailForm } from "@/components/EmailForm";
import { TitleBox } from "@/components/TitleBox";
import Head from "next/head";

//API Calls
import { indexArticles } from "@/lib/articles";

export const metadata = {
  title: "Leeds Think Tank - Home",
  description:
    "Leeds Think Tank (LTT) is a student-led and student-run think tank dedicated to undertaking empirically driven research and non-partisan policy that centres on both local and national issues.",
};

export default async function Home() {
  const articles = await indexArticles();
  const numOfArticles = 6;
  const carouselOptions = {
    //Options, for more information see https://splidejs.com/guides/options/
    speed: 1750,
    autoplay: true,
    rewind: true,
    pause: false,
    interval: 4000,
    type: "fade",
    pauseOnHover: false,
    pauseOnFocus: true,
    slideFocus: true,
    rewindByDrag: true,
    // cover: true,
    height: "450px",
    resetProgress: true,
    dragMinThreshold: 10,
    lazyLoad: "nearby",
  };
  return (
    <>
      <ImageCarousel
        articles={articles.slice(0, numOfArticles)}
        options={carouselOptions}
      />
      <div className="home-column-wrapper">
        <div className="home-column">
          <div className="tagline-wrapper">
            <p className="tagline-primary">
              Research for <span className="underline">Everyone</span>
            </p>
            <p className="tagline-secondary">
              Committed to high quality, open-source analysis.
            </p>
          </div>
          <div className="image-buttons-first-row">
            <ImageButtons
              text={["Reports", "Articles"]}
              images={[`/images/img-6.jpg`, `/images/img-22.jpeg`]}
              shape="imgb--rect"
              color="#4d5c4e"
              paths={["/reports", "/articles"]}
              newTabs={[false, false]}
            />
          </div>
          <div className="image-buttons-second-row">
            <ImageButtons
              text={["Latest Events", "Join Us", "Contact Us"]}
              images={[
                `/images/img-6.jpg`,
                `/images/img-21.jpeg`,
                `/images/img-5.jpg`,
              ]}
              shape="imgb--thin"
              color="#706731"
              paths={[
                "https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/events",
                "https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/memberships",
                "/aboutus",
              ]}
              newTabs={[true, true, false]}
            />
            <div className="article-cards-wrapper">
              {articles.slice(0, numOfArticles).map((value, key) => {
                return (
                  <ArticleCard
                    key={key}
                    subject={value.subject}
                    thumbnail={`${process.env.APP_PUBLIC_URL}${value.cardImage}`}
                    title={value.title}
                    type="Article"
                    author={value.author}
                    path={`articles/${value.id}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
