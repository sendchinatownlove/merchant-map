import "./MerchantCard.scss";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import { EventActionType } from "../../utilities/handleEventReducer";
import { Merchant } from "../../utilities/types";
import MerchantCard from ".";
import { useState } from "react";
import { COLOR } from "../../utilities/colors";
import { PrevButton } from "../MerchantList/MobileMerchantList/icons";

interface MerchantCardExpandedProps {
  merchant: Merchant;
}

interface BackToResultsProps {
  onClick: () => void;
}

interface ExpandedMenuProps {
  merchant: Merchant;
}
enum CurrentView {
  "STORY",
  "PAST_CAMPAIGNS",
}

function PastCampaigns() {
  return <div>Past campaigns Past campaigns</div>;
}

function BackToResults({ onClick }: BackToResultsProps) {
  return (
    <div className="BackToResults" onClick={onClick}>
      <PrevButton />
      <span>Back to results</span>
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
          <div className="ExpandedMenu--Content--Story">{merchant.story}</div>
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
    <div className="MerchantCardExpanded">
      <BackToResults onClick={handleClick} />
      <MerchantCard merchant={merchant} />
      <ExpandedMenu merchant={merchant} />
    </div>
  );
}

export default MerchantCardExpanded;
