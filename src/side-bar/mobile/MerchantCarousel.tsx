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

  useEffect(() => {
    dispatch({
      type: EventActionType.HANDLE_USER_SCROLL_AND_CAROUSEL_CLICK,
      payload: { merchant: merchants[merchantIndex] },
    });
  }, [merchantIndex]);

  const handleBackButtonClick = () => {
    if (!merchants) return;
    if (merchantIndex === 0) {
      setMerchantIndex(merchants.length - 1);
    } else {
      setMerchantIndex(merchantIndex - 1);
    }
  };

  const handleForwardButtonClick = () => {
    if (!merchants) return;
    if (merchantIndex === merchants.length - 1) {
      setMerchantIndex(0);
    } else {
      setMerchantIndex(merchantIndex + 1);
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

      {<MerchantCard merchant={merchants[merchantIndex]} />}
    </>
  );
}
