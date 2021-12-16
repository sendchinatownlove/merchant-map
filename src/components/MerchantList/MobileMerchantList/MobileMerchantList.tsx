import { Merchant } from "../../../utilities/types";
import MerchantCard from "../../MerchantCard/MerchantCard";
import NavButtons from "./NavButtons";
import { useEventHandler } from "../../../utilities/EventHandlerContext";
import { useEffect, useState } from "react";
import { EventActionType } from "../../../utilities/handleEventReducer";

type MobileMerchantListProps = {
  merchants: Merchant[];
  index: number;
};

export function MobileMerchantList({
  merchants,
  index,
}: MobileMerchantListProps) {
  const { dispatch } = useEventHandler();
  const [merchantIndex, setMerchantIndex] = useState<number>(index);

  // Update state whenever user clicks left or right button
  useEffect(() => {
    const merchantOnScreen = merchants[merchantIndex];
    dispatch({
      type: EventActionType.HANDLE_USER_SCROLL_AND_CAROUSEL_CLICK,
      payload: { merchant: merchantOnScreen },
    });
  }, [merchantIndex]);

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
        <MerchantCard merchant={merchants[merchantIndex]} />
      </div>
      <NavButtons
        onBackButtonClick={handleBackButtonClick}
        onForwardButtonClick={handleForwardButtonClick}
      />
    </>
  );
}
