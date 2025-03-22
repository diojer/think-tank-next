import React from "react";
import Head from "next/head";
import "./platform.css";

//component imports
import { TitleBox } from "@/components/TitleBox";

const aboutus = {
    aims: `We are a UK-based student-led Think Tank affiliated with Leeds University Union (a registered UK charity), dedicated to undertaking empirically driven and non-partisan policy research. Our research will cover both local and national issues.`,
};

export default function Platform() {
    return (
        <>
            <TitleBox
                image="/images/titleboxes/aboutus.jpg"
                color="#2e2d2b"
                font="white"
                type="center"
            >
                Our Platform
                <span className="hilite">.</span>
            </TitleBox>
            <div className="aboutus-text-wrapper">
                <div className="aboutus-column">
                    <div className="aboutus-aims">
                        <p className="aboutus-title">
                            Our Aims<span className="primary">:</span>
                        </p>
                        <p className="aboutus-text">{aboutus.aims}</p>
                    </div>
                    <div className="aboutus-background">
                        <p className="aboutus-title">
                            Our Background<span className="primary">:</span>
                        </p>
                        <p
                            className="aboutus-text"
                            style={{
                                marginBottom: 0,
                            }}
                        >
                            Our 6 Policy areas are:
                        </p>
                        <div className="aboutus-list-wrapper">
                            <ul className="aboutus-text first-row">
                                <li>Macro Policy</li>
                                <li>Energy and Environment</li>
                                <li>Urban Planning and Transport</li>
                                <li>Foreign Policy</li>
                            </ul>
                            <ul className="aboutus-text second-row">
                                <li>Social Policy</li>
                                <li>Labour Market Policy</li>
                                <li>Industrial Policy</li>
                                <li>Financial Regulations</li>
                            </ul>
                        </div>
                        <div className="aboutus-background-text">
                            <p className="aboutus-text">
                                Established in April 2023, Leeds Policy Institute (LPI) is working to engage the student body in policy dialogue through high-quality research. Alongside our regular reports and smaller-scale articles, we will host speaker and panellist events within the university. Finally, with connections to prominent newspapers, we will work to get our most impressive members’ articles published nationwide. LPI seeks to empower its student members and contribute to the betterment of society.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}