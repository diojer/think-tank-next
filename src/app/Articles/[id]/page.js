import React from "react";
import "./ShowArticle.css";
import { TitleBox } from "../../../components/TitleBox";
import parse, { attributesToProps } from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  WhatsappShareButton,
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  RedditShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  WhatsappIcon,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  TwitterIcon,
  RedditIcon,
  TelegramIcon,
  LinkedinIcon,
} from "react-share";
import { headers } from "next/headers";

const articles_path = `${process.env.APP_URL}/api/articles/`;

async function getArticle(id) {
  const response = await fetch(`${articles_path}${id}`);
  const data = await response.json();
  return data.data;
}

export default async function ShowArticle(params) {
  // Get article id
  const id = params.params.id;
  const article = await getArticle(id);

  // window.location.href alternative (can't do that in server components)
  const heads = headers();
  const shareUrl = heads.get("next-url");

  const getTime = () => {
    const articleCreatedAt = new Date(article.created_at);
    const timeNow = new Date();
    // Calculate time difference in seconds
    let timeDifference = Math.floor(Math.abs(articleCreatedAt - timeNow) / 36e5);
		console.log(timeDifference);

    // Set the time based on time difference
    if (timeDifference < 24) {
      return `${timeDifference} hour(s) ago.`;
    } else if (timeDifference < 30 * 24) {
      timeDifference = Math.round(timeDifference / 24);
      return `${timeDifference} day(s) ago.`;
    } else if (timeDifference < 365 * 12) {
      timeDifference = Math.round(timeDifference / 30);
      return `${timeDifference} months ago.`;
    } else {
      timeDifference = Math.round(timeDifference / 365);
      return `${timeDifference} years ago.`;
    }
  };

	const time = getTime();

  return (
    <>
      {article ? (
        <>
          <TitleBox
            image={`${process.env.VITE_API_PUBLIC_URL}${article.bannerImage}`}
            color="#2e2d2b"
            font="white"
            type="center"
            textType="center"
            height="300px"
          />
          <div className="selected-article-wrapper">
            <div className="selected-article-column">
              <p className="selected-article-title">{article.title}</p>
              <p className="selected-article-byline">{article.byline}</p>
              <p className="selected-article-author">
                Published by <a>{article.author}</a> {time}
              </p>
              {/* <div className="sharebtn">
                <button className="hover-shake share-btns">
                  <FontAwesomeIcon icon="fa-solid fa-share" />
                </button>
                <div className="share-options">
                  <FacebookShareButton
                    url={shareUrl}
                    title={article.title}
                    appId="1015935046327073"
                    share-btns
                    resetButtonStyle={false}
                  >
                    <FacebookIcon round={true} />
                  </FacebookShareButton>
                  <FacebookMessengerShareButton
                    url={shareUrl}
                    quote={article.title}
                    appId="1015935046327073"
                    share-btns
                    resetButtonStyle={false}
                  >
                    <FacebookMessengerIcon round={true} />
                  </FacebookMessengerShareButton>
                  <TwitterShareButton
                    url={shareUrl}
                    title={`${article.title} by ${article.author}`}
                    via="leedsthinktank"
                    share-btns
                    resetButtonStyle={false}
                  >
                    <TwitterIcon round={true} />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={shareUrl}
                    source="Leeds Think Tank"
                    title={article.title}
                    share-btns
                    resetButtonStyle={false}
                  >
                    <LinkedinIcon round={true} />
                  </LinkedinShareButton>
                  <RedditShareButton
                    url={shareUrl}
                    title={`${article.title} by ${article.author}`}
                    share-btns
                    resetButtonStyle={false}
                  >
                    <RedditIcon round={true} />
                  </RedditShareButton>
                  <WhatsappShareButton
                    url={shareUrl}
                    title={`${article.title} by ${article.author}`}
                    share-btns
                    resetButtonStyle={false}
                  >
                    <WhatsappIcon round={true} />
                  </WhatsappShareButton>
                  <TelegramShareButton
                    url={shareUrl}
                    title={article.title}
                    share-btns
                    resetButtonStyle={false}
                  >
                    <TelegramIcon round={true} />
                  </TelegramShareButton>
                  <EmailShareButton
                    url={shareUrl}
                    subject={`${article.title} by ${article.author}`}
                    body="Here's an article by the Leeds Think Tank: "
                    share-btns
                    resetButtonStyle={false}
                  >
                    <EmailIcon round={true} />
                  </EmailShareButton>
                </div>
              </div> */}
              <div className="selected-article-content">
                {article &&
                  parse(article.content, {
                    //parsing to html and adding target="_blank" to all <a> tags
                    transform: (element, DOM, index) => {
                      if (DOM.attribs && DOM.attribs.href) {
                        DOM.attribs.target = "_blank";
                        const props = attributesToProps(DOM.attribs);
                        return (
                          <a {...props}>
                            {element.props.children.props.children}
                          </a> //what the fuck is this syntax man
                        );
                      }
                      return <>{element}</>;
                    },
                  })}
              </div>
            </div>
          </div>
          <div className="article-disclosure">
            <p className="article-disclosure-text">
              All articles and opinions posted give the views of the author(s)
              and do not necessarily reflect the views of the Leeds Think Tank,
              the Leeds University Union, or the University of Leeds.
            </p>
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
