//Imports
import React from "react";
import "./Home.css";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ImageButtons } from "@/components/ImageButtons";
import IconButton from "@/components/IconButton";
import IconButtons from "@/components/IconButtons";
import { ArticleCard } from "@/components/ArticleCard";

//FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEnvelopesBulk,
  faFileContract,
  faFileLines,
  faGlobe,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

//API Calls
import { index } from "@/lib/routes";

export const metadata = {
  title: "Leeds Policy Institute - Home",
  description:
    "Leeds Policy Institute (LPI) is a student-led and student-run think tank dedicated to undertaking empirically driven research and non-partisan policy that centres on both local and national issues.",
};

export default async function Home() {
  const articles = await index("/articles");
  const numOfArticles = 6;
  const carouselOptions = {
    //Options, for more information see https://splidejs.com/guides/options/
    speed: 1750,
    autoplay: true,
    rewind: true,
    pause: false,
    interval: 4000,
    type: "loop",
    pauseOnHover: false,
    pauseOnFocus: true,
    slideFocus: true,
    rewindByDrag: true,
    resetProgress: true,
    dragMinThreshold: 10,
    lazyLoad: "sequential",
  };
  return (
    <>
      <ImageCarousel
        articles={articles.slice(0, numOfArticles)}
        options={carouselOptions}
      />
      <div className="home-column-wrapper">
        <div className="icon-buttons-background">
          <div className="home-column">
            <IconButtons
              contents={[
                {
                  icon: <FontAwesomeIcon icon={faFileContract} />,
                  title: "Reports",
                  text: "Latest reports and policies",
                },
                {
                  icon: <FontAwesomeIcon icon={faNewspaper} />,
                  title: "Articles",
                  text: "Latest op-eds on a variety of topics",
                },
                {
                  icon: <FontAwesomeIcon icon={faCalendarDays} />,
                  title: "Events",
                  text: "Check out our latest events",
                },
                {
                  icon: <FontAwesomeIcon icon={faGlobe} />,
                  title: "Join Us",
                  text: "Become a member of LPI",
                },
                {
                  icon: <FontAwesomeIcon icon={faEnvelopesBulk} />,
                  title: "Contact Us",
                  text: "Send us an email",
                },
                {
                  icon: <FontAwesomeIcon icon={faFileLines} />,
                  title: "Press Releases",
                  text: "Write about our latest reports",
                },
              ]}
              color={"#2C2B3C"}
              linkProps={[
                { href: "/reports" },
                { href: "/articles" },
                {
                  href: "https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/events",
                  target: "_blank",
                },
                {
                  href: "https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/memberships",
                  target: "_blank",
                },
                {
                  href: "#contact-us",
                },
                {
                  href: "/media/appearances",
                },
              ]}
            />
          </div>
        </div>
        <div className="home-column">
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
    </>
  );
}
