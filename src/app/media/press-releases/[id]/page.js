import React from "react";
import { TitleBox } from "@/components/TitleBox";
import "../press-releases.css";
import parse, { attributesToProps } from "html-react-parser";
import ShareBar from "@/components/ShareBar";
import { headers } from "next/headers";
import Posts from "@/app/models/Posts";

//API calls
import { getById, index } from "@/lib/routes";
import { revalidateTag } from "next/cache";

export async function generateStaticParams() {
    const pressReleases = await Posts.findAll({ where: { type: "press-release" } });
    return pressReleases.map((pressRelease) => ({
        id: pressRelease.slug.toString(),
    }));
}

export const dynamicParams = true

export default async function ShowArticle({ params }) {
    // Get pressRelease id
    const { id } = params;
    revalidateTag("/posts/press-releases");
    const pressRelease = await getById("/posts/press-releases", id);

    // window.location.href alternative (can't do that in server components)
    const heads = headers();
    const shareUrl = heads.get("next-url");

    const getTime = () => {
        const createdAt = new Date(pressRelease.createdAt);
        const timeNow = new Date();
        // Calculate time difference in seconds
        let timeDifference = Math.floor(
            Math.abs(createdAt - timeNow) / 36e5
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
            {pressRelease ? (
                <>
                    <TitleBox
                        image={`${process.env.APP_PUBLIC_URL}${pressRelease.bannerImage}`}
                        color="#2e2d2b"
                        font="white"
                        type="center"
                        textType="center"
                        height="300px"
                    />
                    <div className="selected-article-wrapper">
                        <div className="selected-article-column">
                            <p className="selected-article-title">{pressRelease.title}</p>
                            <p className="selected-article-byline">{pressRelease.byline}</p>
                            <p className="selected-article-author">
                                Published by <a>{pressRelease.author}</a> {time}
                            </p>
                            <ShareBar shareUrl={shareUrl} article={pressRelease} />
                            <div className="selected-article-content">
                                {pressRelease && parse(String(pressRelease.content))}
                            </div>
                        </div>
                    </div>
                    {/* <div className="article-disclosure">
            <p className="article-disclosure-text">
              All articles and opinions posted give the views of the author(s)
              and do not necessarily reflect the views of the Leeds Think Tank,
              the Leeds University Union, or the University of Leeds.
            </p>
          </div> */}
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
