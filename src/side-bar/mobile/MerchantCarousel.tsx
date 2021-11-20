import { Merchant } from "../../utilities/types";
import { NavButtons } from "./NavButtons";
import MerchantCard from "../../merchant-card/MerchantCard";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import { useEffect, useState } from "react";
import { EventActionType } from "../../utilities/handleEventReducer";

type MerchantCarouselProps = {
  merchants: Merchant[];
};

export function MerchantCarousel({ merchants }: MerchantCarouselProps) {
  const { state, dispatch } = useEventHandler();
  const [merchantIndex, setMerchantIndex] = useState<number>(0);

  // When user clicks on a clicked merchant, update merchantIndex with the index
  // of the clicked merchant in the merchants array.
  useEffect(() => {
    for (let i = 0; i < merchants.length; i++) {
      const currentMerchant = merchants[i];
      if (currentMerchant.name === state.clickedMerchant?.name) {
        setMerchantIndex(i);
      }
    }
  }, [state.clickedMerchant]);

  // When the merchantIndex is updated via map click or carousel change, update the state.
  // This triggers the map to pan.
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
