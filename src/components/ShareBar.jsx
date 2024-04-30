"use client";
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

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

const ShareBar = ({ shareUrl, article }) => {
  return (
    <div className="sharebtn">
      <button className="hover-shake share-btns">
        <FontAwesomeIcon icon={faShare} />
      </button>
      <div className="share-options">
        <FacebookShareButton
          url={shareUrl}
          title={article.title}
          appid="1015935046327073"
          share-btns
          resetButtonStyle={false}
        >
          <FacebookIcon round={true} />
        </FacebookShareButton>
        <FacebookMessengerShareButton
          url={shareUrl}
          quote={article.title}
          appid="1015935046327073"
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
          body="Here's an article by the Leeds Policy Institute: "
          share-btns
          resetButtonStyle={false}
        >
          <EmailIcon round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareBar;
