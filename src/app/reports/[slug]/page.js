import React from "react";
import "@/app/reports/reports.css";
import { TitleBox } from "../../../components/TitleBox";
import parse, { attributesToProps } from "html-react-parser";
import ShareBar from "@/components/ShareBar";
import { headers } from "next/headers";
import Image from "next/image";
import Reports from "@/app/models/Reports";

//API calls
import { getById, index } from "@/lib/routes";
import { revalidateTag } from "next/cache";

export async function generateStaticParams() {
    const reports = await Reports.findAll();
    return reports.map((report) => ({
        slug: report.slug.toString(),
    }));
}

export const dynamicParams = true

export default async function ShowReport({ params }) {
    const { slug } = params;
    revalidateTag("/reports");
    const report = await getById("/reports", slug);

    // window.location.href alternative (can't do that in server components)
    const heads = headers();
    const shareUrl = process.env.APP_URL + heads.get("next-url");

    const getTime = () => {
        const createdAt = new Date(report.createdAt);
        let timeNow = new Date();
        const diffMins = Math.floor(Math.abs(timeNow - createdAt) / (1000 * 60));
        // Set the time based on time difference
        if (diffMins < 60) {
            return `${diffMins} minute(s) ago.`;
        } else if (diffMins < 60 * 24) {
            const diffHours = Math.floor(diffMins / 60)
            return `${diffHours} hour(s) ago.`;
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

    const authorsCleaned = (() => {
        try {
            const authors = report.authors.split(";");
            authors.map((author, key) => {
                authors[key] = author.trim();
                let names = author.split(",");
                let n = names[0].trim();
                names[0] = names[1].trim();
                names[1] = n;
                authors[key] = `${names[0]} ${names[1]}`
            })
            return authors;
        } catch (error) {
            return null;
        }
    })()

    //for the share bar
    report.authors = (() => {
        let authors = [];
        authorsCleaned.map((author, key, arr) => {
            if (key === 0) {
                authors.push(`${author}`)
            } else {
                authors.push(` ${author}`)
            }
        })
        return authors;
    })();

    return (
        <>
            {report ? (
                <>
                    <TitleBox
                        image={`${process.env.APP_PUBLIC_URL}${report.bannerImage}`}
                        color="#2e2d2b"
                        font="white"
                        type="bottom"
                        textType="center"
                        height="300px"
                    />
                    <div className="selected-article-wrapper">
                        <div className="selected-article-column">
                            <p className="selected-article-title">{report.title}</p>
                            <p className="selected-article-byline">{report.byline}</p>
                            <p className="selected-reports-authors">
                                Authored by: {authorsCleaned.map((author, key, arr) => {
                                    if (key + 1 === arr.length) {
                                        return (<><span className={`selected-report-author ${key}`}><a>{`${author}`}</a></span></>)
                                    } else {
                                        return (<><span className={`selected-report-author ${key}`}><a>{`${author}`}</a></span><span>{` • `}</span></>)
                                    }

                                })}. <p>Published {time}</p>
                            </p>
                            <ShareBar shareUrl={shareUrl} article={report} />
                            <p className="report-abstract-label">Abstract:</p>
                            <div className="selected-report-abstract">

                                {report && parse(String(report.abstract))}
                            </div>
                            <div className="report-clickthrough-wrapper">
                                <p className="report-abstract-label">Read the full report <a href={`${process.env.APP_PUBLIC_URL}${report.fileLocation}`}>here</a>.</p>
                                <div className="report-thumbnail-wrapper" alt="Report Thumbnail">
                                    <Image
                                        src={`${process.env.APP_PUBLIC_URL}${report.cardImage}`}
                                        fill
                                        objectFit="contain"
                                        className="report-thumbnail"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="article-disclosure">
                        {/* <p className="article-disclosure-text">
                            All articles and opinions posted give the views of the author(s)
                            and do not necessarily reflect the views of the Leeds Think Tank,
                            the Leeds University Union, or the University of Leeds.
                        </p> */}
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
        </>)
}