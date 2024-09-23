import React from "react";
import Head from "next/head";
import "./team.css";

import { Profile } from "@/components/Profile";
import { TitleBox } from "@/components/TitleBox";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const team = {
  aboutme: [
    "I'm Nicolas, a second year PPE student from Brazil. I'm particularly interested in the link between education and social policy. I also have a small collection of model planes.",
    "My name is Ruby Bell and I’m a second year PPE student here at the University of Leeds. Through my various roles within the Think Tank, I engage in my area of interest: macro-economic policy research. I am also interested in the interconnectivity between economic and social policies.",
    "I'm Diogo Ferreira, a 2nd Year PPE student. I was born in Portugal, but I grew up in South East London. I really enjoy writing and editing articles for our think tank. In my spare time I like programming simple games and websites - like this one!",
    "Hi, I’m Natasha a 2nd year PPE student. I am honoured to be treasurer this year. I have a particular interest in environmental policy- you can read my article on ULEZ for more!",
    "I am an Economics student at the University of Leeds and Head of Research at the Leeds Think Tank society where I deploy the skills I learned during my IEA internship. In my spare time, I also run an economics education company, The Backseat Economist, and write on monetary & fiscal policy, international trade, labour market and environmental issues for different publications. ",
    "I'm Archie, a second year Economics and Politics student. With a left-wing political background, my primary interest is wealth inequality. ",
    "I'm Rhoda, and I am a second year English literature student from South-east London. I have a passion for language and love helping writers to find the most effective and unique ways to get their message across.",
    "My name is Joseph Clark, I’m currently in my second year of a BSc in Economics, and enjoying it greatly. I have an interest in novel policy proposals and how markets can be influenced indirectly. I also have two (very cute) dogs back home 👍.",
  ],
  aboutme2: [
    "I'm Nicolas, a second year PPE student from Brazil. I'm particularly interested in the link between education and social policy. I also have a small collection of model planes.",
    "I'm Rares, an Economics student who is currently on his placement year within the Government Economic Service at the Department for Transport. My main interests are macroeconomic policy, international economics and labour markets. I also tend to yap about music after a pint or two.",
    "I'm Diogo Ferreira, a 3rd Year PPE student. I was born in Portugal, but I grew up in South East London. I enjoy writing and editing articles for our think tank. In my spare time I like programming simple games and websites - like this one!",
    "I'm Adrian, a third year Economics student at the University of Leeds and really loving it. I was originally born in Poland and I'm particularly interested in finance, policy and (unsurprisingly) economics :D",
    "I'm Cass, a 3rd year PPE student from North London. I'm interested in a variety of political and economic issues, especially those concerning geopolitics and foreign policy.",
    "Hi! I'm Dona, a second year Liberal Arts student. I'm excited to be entering my second year in LPI. Can't wait to see you at our socials to talk everything from policy to pop culture.",
    "I'm a third-year Philosophy and Physics student. I am a staunch advocate for youth work and happen to be of the opinion that literature has not recovered since Plato.",
    "I'm Joseph, and am currently on placement for my BSc in Economics. I have a strong interest in credit and industrial direction. This year, I'll be working in the Cabinet office with the civil service in London while LPI's Head of Public Affairs.",
    "Hi, I'm Hubert, a placement student at Oxford Economics and Head of Data Analysis at LPI. As well as managing the think tank's data and statistical output, I quite enjoy hiking and reading when not writing copious amounts of op-eds on finance plumbing, central banking, and financial markets.",
  ],
};

export default function Team() {
  return (
    <>
      <TitleBox
        image="/images/titleboxes/team.jpg"
        color="#2e2d2b"
        font="white"
        type="center"
      >
        LPI Committee 2024/25<span className="hilite">:</span>
      </TitleBox>
      <div className="profiles-wrapper">
        <div className="profiles-row profiles-row-1">
          <Profile
            image="/images/team/img-27.jpeg"
            name="Nicolas Padula"
            position="President"
            degree="BA Politics, Philosophy and Economics"
            year_of_study="3rd Year"
            linkedin="https://www.linkedin.com/in/nicolas-padula-pinho-luu-ltt-lcc/"
          >
            {team.aboutme2[0]}
          </Profile>
          <Profile
            image="/images/team/rares.PNG"
            name="Rares Dascalu"
            position="Vice-President"
            degree="Bsc Economics"
            year_of_study="3rd Year"
            linkedin="https://www.linkedin.com/in/rares-constantin-dascalu-a445a1266/"
          >
            {team.aboutme2[1]}
          </Profile>
        </div>
        <div className="profiles-row profiles-row-2">
          <Profile
            image="/images/team/cass.jpg"
            name="Cass Leftley"
            position="Head of Research"
            degree="BA Politics, Philosophy and Economics"
            year_of_study="3rd Year"
            linkedin="https://www.linkedin.com/in/cass-hoad-leftley-4322a5282/"
          >
            {team.aboutme2[4]}
          </Profile>
          <Profile
            image="/images/team/bashra.PNG"
            name="Bashra Mahamed"
            position="Head of Editing"
            degree="BA Philosophy and Physics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/bashra-mahamed-600999216/"
          >
            {team.aboutme2[6]}
          </Profile>
        </div>
        <div className="profiles-row profiles-row-3">
          <Profile
            image="/images/team/josephC.jpg"
            name="Joseph Clark"
            position="Head of Public Affairs"
            degree="Bsc Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/josephsamuelclark/"
          >
            {team.aboutme2[7]}
          </Profile>
          <Profile
            image="/images/team/dona.jpg"
            name="Donatella Petrucci"
            position="Head of Media and Communication"
            degree="BA Liberal Arts (Politics Major)"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/donatella-petrucci-a04189287/"
          >
            {team.aboutme2[5]}
          </Profile>
        </div>
        <div className="profiles-row profiles-row-4">
          <Profile
            image="/images/team/adrian.jpg"
            name="Adrian Kubiak"
            position="Treasurer"
            degree="Bsc Economics"
            year_of_study="3rd Year"
            linkedin="https://www.linkedin.com/in/adriankubiak/"
          >
            {team.aboutme2[3]}
          </Profile>
          <Profile
            image="/images/team/hubertK.jpg"
            name="Hubert Kucharski"
            position="Head of Data Analysis"
            degree="BSc Economics"
            year_of_study="3rd Year"
            linkedin="https://www.linkedin.com/in/hubertkucharski/"
          >
            {team.aboutme2[8]}
          </Profile>
        </div>
        <div className="profiles-row profiles-row-5">
          <Profile
            image="/images/team/DiogoFerreira.jpeg"
            name="Diogo Ferreira"
            position={["Secretary", "Head of Technology"]}
            degree="BA Politics, Philosophy and Economics"
            year_of_study="3rd Year"
            linkedin="https://www.linkedin.com/in/diogo-ferreira-025458210/"
          >
            {team.aboutme2[2]}
          </Profile>
        </div>
        <hr></hr>
        <p className="aboutus-title">
          Committee 2023/24<span className="hilite">:</span>
        </p>
        <div className="profiles-row profiles-row-1">
          <Profile
            image="/images/team/img-27.jpeg"
            name="Nicolas Padula"
            position="President"
            degree="BA Politics, Philosophy and Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/nicolas-padula-pinho-luu-ltt-lcc/"
          >
            {team.aboutme[0]}
          </Profile>
          <Profile
            image="/images/team/rubyB.jpg"
            name="Ruby Bell"
            position="Vice-President"
            degree="BA Politics, Philosophy and Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/ruby-bell-580540252/"
          >
            {team.aboutme[1]}
          </Profile>
        </div>
        <div className="profiles-row profiles-row-2">
          <Profile
            image="/images/team/DiogoFerreira.jpeg"
            name="Diogo Ferreira"
            position={["Secretary", "Head of Technology"]}
            degree="BA Politics, Philosophy and Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/diogo-ferreira-025458210/"
          >
            {team.aboutme[2]}
          </Profile>
          <Profile
            image="/images/team/img-26.jpeg"
            name="Natasha Dawson"
            position="Treasurer"
            degree="BA Politics, Philosophy and Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/natasha-dawson-441560237/"
          >
            {team.aboutme[3]}
          </Profile>
        </div>
        <div className="profiles-row profiles-row-3">
          <Profile
            image="/images/team/hubertK.jpg"
            name="Hubert Kucharski"
            position="Head of Research"
            degree="Bsc Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/hubertkucharski/"
          >
            {team.aboutme[4]}
          </Profile>
          <Profile
            image="/images/team/img-23.jpeg"
            name="Archie Ryan"
            position="Social Media Secretary"
            degree="BA Economics and Politics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/archie-ryan-b81897282/"
          >
            {team.aboutme[5]}
          </Profile>
        </div>
        <div className="profiles-row profiles-row-4">
          <Profile
            image="/images/team/rhoda.jpeg"
            name="Rhoda Wilson"
            position="Head of Editing"
            degree="BA English Literature"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/rhoda-wilson-708a712a2/"
          >
            {team.aboutme[6]}
          </Profile>
          <Profile
            image="/images/team/josephC.jpg"
            name="Joseph Clark"
            position="Head of Public Affairs"
            degree="Bsc Economics"
            year_of_study="2nd Year"
            linkedin="https://www.linkedin.com/in/josephsamuelclark/"
          >
            {team.aboutme[7]}
          </Profile>
        </div>
      </div>
    </>
  );
}
