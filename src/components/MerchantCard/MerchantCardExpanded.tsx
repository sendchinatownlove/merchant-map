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

const test_story =
  "Growing up in Darjeeling, a region in the foothills of the Himalayas, Karma was immersed in both Tibetan and Nepali culture, and food was always at the center of her life. Her parents were Tibetan refugees in India whose livelihood as small-scale farmers inspired her journey to the food industry. After she moved to the United States in 1998, she eventually opened her own restaurant, Cafe Himalaya, despite having no prior restaurant or business experience. Opening the restaurant with her savings required a huge leap of faith but she was confident in her vision to share a part of the Himalayas with everyday New Yorkers. Not only was this a way to pay homage to the diverse cultures and traditions she grew up with, but also a way to give back to the community by supporting her staff of immigrant employees and their families.";

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

  const selectedStyle = { color: COLOR.PRIMARY_RED };

  return (
    <div className="ExpandedMenu">
      <div className="ExpandedMenu--Select">
        <span
          className="ExpandedMenu--Select--Tab"
          style={currentView == CurrentView.STORY ? selectedStyle : {}}
          onClick={() => setCurrentView(CurrentView.STORY)}
        >
          Story
        </span>
        <span
          className="ExpandedMenu--Select--Tab"
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
