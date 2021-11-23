import { Merchant } from "../../utilities/types";
import { NavButtons } from "./NavButtons";
import MerchantCard from "../../merchant-card/MerchantCard";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import { useEffect, useState } from "react";
import { EventActionType } from "../../utilities/handleEventReducer";

type MerchantCarouselProps = {
  merchants: Merchant[];
  index: number;
};

export function MerchantCarousel({ merchants, index }: MerchantCarouselProps) {
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
      <NavButtons
        onBackButtonClick={handleBackButtonClick}
        onForwardButtonClick={handleForwardButtonClick}
      />

      <MerchantCard
        merchant={merchants[merchantIndex]}
        index={merchantIndex}
        numberOfMerchants={merchants.length}
      />
    </>
  );
}
