import React from "react";
import "@/app/articles/Articles.css";
import "./reports.css";
import { revalidateTag } from "next/cache";
import ReportCard from "@/components/ReportCard";
import { index } from "@/lib/routes";

//component imports
import { TitleBox } from "../../components/TitleBox";

async function Reports() {
  revalidateTag("/reports");
  const reports = await index("/reports");
  let filled = false;
  if (reports.length > 0) {
    filled = true
  }
  return (
    <>
      <TitleBox
        image="/images/titleboxes/reports.jpg"
        color="#2e2d2b"
        font="white"
        type="bottom"
      >
        Reports<span className="hilite">.</span>
      </TitleBox>
      {filled ? <div className="articles-aligner">
        <div className="articles-column">
          <div className="articles-wrapper">
            {reports.map((report, key) => (
              <ReportCard
                key={key}
                subject={report.subject}
                thumbnail={`${process.env.APP_PUBLIC_URL}${report.cardImage}`}
                title={report.title}
                type="Report"
                author={report.authors}
                path={`reports/${report.slug}`}
                description={report.description}
              />
            ))}
          </div>
        </div>
      </div> : <div className="WIP-wrapper">
        <div className="WIP-message">
          <p className="WIP-message-title">
            Sorry, no reports have been published yet.
          </p>
          <p className="WIP-message-text">Coming Friday the 3rd of May, 2024!</p>
        </div>
      </div>}

    </>
  );
}

export default Reports;
