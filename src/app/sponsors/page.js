import React from "react";
import "./sponsors.css";
import { TitleBox } from "../../components/TitleBox";

function Sponsors() {
  return (
    <div>
      <TitleBox
        image="/images/titleboxes/sponsors.jpg"
        color="#2e2d2b"
        font="white"
        type="bottom"
      >
        Sponsors<span className="hilite">.</span>
      </TitleBox>
      <div className="WIP-wrapper">
        <div className="WIP-message">
          <p className="WIP-message-title">
            We have no confirmed sponsors at the moment.
          </p>
          <p className="WIP-message-text">
            Please check again later! If you are interested in sponsoring us,
            please see our contact details at the bottom of the page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
