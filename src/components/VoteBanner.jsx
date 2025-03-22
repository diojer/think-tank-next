"use client";
import "./VoteBanner.css";
import { useState } from "react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";

function VoteBanner() {
  const [open, setStatus] = useState(true);
  
  return (
    open && (
      <div className="votebanner">
        <div>
          <p className="voteBannerText">LPI Election nominations will take place soon! <a className="special" href="https://engage.luu.org.uk/election/XY8XY/leeds-policy-institute-202526-committee-election">Click here</a> to participate or look at available roles.</p>
          <p className="voteBannerText">Deadline to sign up April 6th.</p>
        </div>
        <button className="close" type="button" onClick={()=>setStatus(false)}><FontAwesomeIcon icon={faCircleXmark} /></button>
        
      </div>
    )
  );
}

export default VoteBanner;
