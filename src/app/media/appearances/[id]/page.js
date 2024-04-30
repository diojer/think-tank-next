import React from "react";
import { TitleBox } from "@/components/TitleBox";
import "../appearances.css";
import parse from "html-react-parser";
import ShareBar from "@/components/ShareBar";
import { headers } from "next/headers";
import Posts from "@/app/models/Posts";

//API calls
import { getById } from "@/lib/routes";
import { revalidateTag } from "next/cache";

export async function generateStaticParams() {
    const mediaApps = await Posts.findAll({ where: { type: "media-appearance" } });
    return mediaApps.map((mediaApp) => ({
        id: mediaApp.slug.toString(),
    }));
}

export const dynamicParams = true

export default async function ShowArticle({ params }) {
    // Get pressRelease id
    const { id } = params;
    revalidateTag("/posts/media-appearances");
    const mediaApp = await getById("/posts/media-appearances", id);

    // window.location.href alternative (can't do that in server components)
    const heads = headers();
    const shareUrl = process.env.APP_URL + heads.get("next-url");

    const getTime = () => {
        const createdAt = new Date(mediaApp.createdAt);
        let timeNow = new Date();
        const diffMins = Math.floor(Math.abs(timeNow - createdAt) / (1000 * 60));
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
            return `${diffWeeks} weeks(s) ago.`;
        } else if (diffMins < 60 * 24 * 7 * 4 * 12) {
            const diffMonths = Math.floor(diffMins / (60 * 24 * 7 * 4))
            return `${diffMonths} months(s) ago.`;
        } else {
            const diffYears = Math.floor(diffMins / (60 * 24 * 7 * 4 * 12))
            return `${diffYears} years(s) ago.`;
        }
    };

    const time = getTime();
    return (
        <>
            {mediaApp ? (
                <>
                    <TitleBox
                        image={`${process.env.APP_PUBLIC_URL}${mediaApp.bannerImage}`}
                        color="#2e2d2b"
                        font="white"
                        type="center"
                        textType="center"
                        height="300px"
                    />
                    <div className="selected-article-wrapper">
                        <div className="selected-article-column">
                            <p className="selected-article-title">{mediaApp.title}</p>
                            <p className="selected-article-byline">{mediaApp.byline}</p>
                            <p className="selected-article-author">
                                Published by <a>{mediaApp.author}</a> {time}
                            </p>
                            <ShareBar shareUrl={shareUrl} article={mediaApp} />
                            <div className="selected-article-content">
                                {mediaApp && parse(String(mediaApp.content))}
                            </div>
                        </div>
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
