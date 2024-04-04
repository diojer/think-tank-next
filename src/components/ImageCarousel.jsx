"use client";
import React from "react";
import "./ImageCarousel.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "./splide-default.min.css";
import { Button } from "./Button";
import Image from "next/image";

export const ImageCarousel = ({ articles, options }) => {
  const imagepath = process.env.APP_PUBLIC_URL;
  return (
    <div className="image-carousel-wrapper">
      <Splide options={options}>
        {articles.map((value, key) => {
          return (
            <SplideSlide key={key}>
              <div
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  backgroundImage: `url("${imagepath}${value.bannerImage}")`,
                }}
                className="carousel-background-image"
              >
                <div className="text-wrapper">
                  <p className="carousel-article-title">{value.title}</p>
                  <p className="carousel-article-author">{`By ${value.author}`}</p>
                  <div className="button-wrapper">
                    <Button
                      path={`articles/${value.id}`}
                      buttonSize="btn--medium"
                      buttonStyle="btn--primary"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};
