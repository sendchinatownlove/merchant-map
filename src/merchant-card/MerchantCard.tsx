import "./MerchantCard.css";
import { useElementOnScreen } from "../utilities/useElementOnScreen";
import { useEffect, useRef } from "react";
import { useEventHandler } from "../utilities/EventHandlerContext";
import { EventActionType } from "../utilities/handleEventReducer";
import { Merchant } from "../utilities/types";

interface MerchantCardProps {
  merchant: Merchant;
}

// useHandleMerchantCard stores the ref to the merchant and handles what happens
// when the merchant div is on the screen
function useHandleMerchantCard(merchant: Merchant, ref: any) {
  const { dispatch } = useEventHandler();
  const isDivOnScreen: boolean = useElementOnScreen(ref, "-300px");
  // store reference to merchant div
  useEffect(() => {
    dispatch({
      type: EventActionType.STORE_MERCHANT_REF,
      payload: { merchant: merchant, ref },
    });
  }, []);

  useEffect(() => {
    if (isDivOnScreen) {
      dispatch({
        type: EventActionType.HANDLE_DIV_ON_SCREEN,
        payload: { merchant },
      });
    }
  }, [isDivOnScreen]);
}

function MerchantCard({ merchant }: MerchantCardProps) {
  // TODO: update ref type
  const ref: any = useRef<Element>(null);
  useHandleMerchantCard(merchant, ref);

  return (
    <div className="merchant-card" ref={ref}>
      <h2>{merchant.name}</h2>
      <p>{merchant.addressLine1}</p>
      <p>{merchant.addressLine2}</p>
      <p>{merchant.phoneNumber}</p>
      <a href={merchant.websiteUrl}>Website</a>
      <p>{merchant.description}</p>
      <a href="#">
        <button>Visit Merchant Page</button>
      </a>
      <div className="merchant-images"></div>
    </div>
  );
}

export default MerchantCard;
