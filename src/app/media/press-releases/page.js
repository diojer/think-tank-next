import React from "react";
import "./press-releases.css";
import { TitleBox } from "@/components/TitleBox";

function PressRelease() {
  return (
    <>
      <TitleBox
        image="/images/titleboxes/press-release.jpg"
        type="bottom"
        color="#2e2d2b"
        font="white"
      >
        Press Releases<span className="hilite">.</span>
      </TitleBox>
      <div className="WIP-wrapper">
        <div className="WIP-message">
          <p className="WIP-message-title">
            We have no public press release information at the moment.
          </p>
          <p className="WIP-message-text">
            Please check again on Friday the 9th of May.
          </p>
          <p className="WIP-message-text">
            If you have received an advanced press release from us, access it through the link in your <b>email</b>.
          </p>
        </div>
      </div>
    </>
  );
}

export default PressRelease;
