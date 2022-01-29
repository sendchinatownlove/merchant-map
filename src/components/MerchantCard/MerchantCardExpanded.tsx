import "./MerchantCard.scss";
import ReactMarkdown from 'react-markdown';
import { useState } from "react";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import { EventActionType } from "../../utilities/handleEventReducer";
import { Merchant } from "../../utilities/types";
import { COLOR } from "../../utilities/colors";
import { PrevButton } from "../MerchantList/MobileMerchantList/icons";
import MerchantCard from ".";

interface MerchantCardExpandedProps {
  merchant: Merchant;
}

interface BackToResultsProps {
  onClick: () => void;
  text: string;
}

interface ExpandedMenuProps {
  merchant: Merchant;
}
enum CurrentView {
  "STORY",
  "PAST_CAMPAIGNS",
}

// TODO: Finish past campaigns
function PastCampaigns() {
  return <div>Nothing to see here...yet!</div>;
}

function BackToResults({ onClick, text }: BackToResultsProps) {
  return (
    <div className="BackToResults" onClick={onClick}>
      <PrevButton />
      <div className="BackToResults--Text">{text}</div>
    </div>
  );
}
function ExpandedMenu({ merchant }: ExpandedMenuProps) {
  const [currentView, setCurrentView] = useState<CurrentView>(
    CurrentView.STORY
  );

  const selectedStyle = {
    color: COLOR.PRIMARY_RED,
    fontWeight: 700,
  };

  return (
    <div className="ExpandedMenu">
      <div className="ExpandedMenu--SelectMenu">
        <span
          className="ExpandedMenu--SelectMenu--Tab"
          style={currentView == CurrentView.STORY ? selectedStyle : {}}
          onClick={() => setCurrentView(CurrentView.STORY)}
        >
          Story
        </span>
        <span
          className="ExpandedMenu--SelectMenu--Tab"
          style={currentView == CurrentView.PAST_CAMPAIGNS ? selectedStyle : {}}
          onClick={() => setCurrentView(CurrentView.PAST_CAMPAIGNS)}
        >
          Past Campaigns
        </span>
      </div>
      <div className="ExpandedMenu--Content">
        {currentView == CurrentView.STORY && (
          <div className="ExpandedMenu--Content--Story">
            <ReactMarkdown>{merchant.story}</ReactMarkdown>
          </div>
        )}
        {currentView == CurrentView.PAST_CAMPAIGNS && (
          <div>{<PastCampaigns />}</div>
        )}
      </div>
    </div>
  );
}
function MerchantCardExpanded({ merchant }: MerchantCardExpandedProps) {
  const { state, dispatch } = useEventHandler();

  const handleClick = () => {
    dispatch({
      type: EventActionType.SET_MERCHANT_CARD_EXPANDED_VIEW,
      payload: {
        expandedView: false,
        merchant: merchant,
      },
    });
  };
  return (
    <>
      <BackToResults onClick={handleClick} text="Back to results" />

      <MerchantCard merchant={merchant} />

      <ExpandedMenu merchant={merchant} />
    </>
  );
}

export default MerchantCardExpanded;
