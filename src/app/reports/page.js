import React from "react";
import "./reports.css";

//component imports
import { TitleBox } from "../../components/TitleBox";

function Reports() {
  return (
    <>
      <TitleBox
        image="/images/titleboxes/reports.jpg"
        color="#2e2d2b"
        font="white"
      >
        Reports<span className="hilite">.</span>
      </TitleBox>
      <div className="WIP-wrapper">
        <div className="WIP-message">
          <p className="WIP-message-title">
            Sorry, no reports have been published yet.
          </p>
          <p className="WIP-message-text">Coming Friday the 3rd of May, 2024!</p>
        </div>
      </div>
    </>
  );
}

export default Reports;
