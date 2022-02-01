import { Merchant } from "../../../utilities/types";
import MerchantCard from "../../MerchantCard/MerchantCard";
import NavButtons from "./NavButtons";
import { useEventHandler } from "../../../utilities/EventHandlerContext";
import { useEffect, useState } from "react";
import { EventActionType } from "../../../utilities/handleEventReducer";
import { UpArrow, DownArrow } from "./icons";

type MobileMerchantListProps = {
  merchants: Merchant[];
  index: number;
};

export function MobileMerchantList({
  merchants,
  index,
}: MobileMerchantListProps) {
  const { state, dispatch } = useEventHandler();
  const [merchantIndex, setMerchantIndex] = useState<number>(index);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Update state whenever user clicks left or right button
  useEffect(() => {
    const merchantOnScreen = merchants[merchantIndex];
    dispatch({
      type: EventActionType.HANDLE_USER_SCROLL_AND_CAROUSEL_CLICK,
      payload: { merchant: merchantOnScreen },
    });
    dispatch({
      type: EventActionType.SET_MERCHANT_CARD_EXPANDED_VIEW,
      payload: {
        merchant: merchantOnScreen,
        expandedView: isExpanded,
      },
    });
  }, [merchantIndex, isExpanded]);

  const handleArrowClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBackButtonClick = () => {
    if (merchants.length > 0 && merchantIndex === 0) {
      setMerchantIndex(merchants.length - 1);
    } else if (merchants.length > 0) {
      setMerchantIndex(merchantIndex - 1);
    } else {
      return;
    }
  };

  const handleForwardButtonClick = () => {
    if (merchants.length > 0 && merchantIndex === merchants.length - 1) {
      setMerchantIndex(0);
    } else if (merchants.length > 0) {
      setMerchantIndex(merchantIndex + 1);
    } else {
      return;
    }
  };

  if (merchants.length === 0) {
    return <div />;
  }

  return (
    <>
      <div className="Merchant--Carousel">
        <div className="Merchant--Carousel--Count">{`${
          merchantIndex + 1
        } OUT OF ${merchants.length}`}</div>
        <div
          className="Merchant--Carousel--Expander--Button"
          onClick={handleArrowClick}
        >
          {isExpanded ? <DownArrow /> : <UpArrow />}
        </div>
        <MerchantCard merchant={merchants[merchantIndex]} />
      </div>
      <NavButtons
        onBackButtonClick={handleBackButtonClick}
        onForwardButtonClick={handleForwardButtonClick}
      />
    </>
  );
}
