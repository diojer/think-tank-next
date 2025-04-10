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
          <p className="voteBannerText">LPI Elections happening now! <a className="special" href="https://engage.luu.org.uk/election/XY8XY/leeds-policy-institute-202526-committee-election">Click here</a> to see the candidates and vote.</p>
        </div>
        <button className="close" type="button" onClick={()=>setStatus(false)}><FontAwesomeIcon icon={faCircleXmark} /></button>
        
      </div>
    )
  );
}

export default VoteBanner;
