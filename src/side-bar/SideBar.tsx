import "./SideBar.css";
import MerchantCard from "../merchant-card/MerchantCard";
import { Merchant } from "../utilities/types";
import { useCheckIfMobile } from "../utilities/useCheckIfMobile";
import { MerchantCarousel } from "./mobile/MerchantCarousel";
import { useEventHandler } from "../utilities/EventHandlerContext";
import { EventActionType } from "../utilities/handleEventReducer";
import { useEffect } from "react";

interface SideBarProps {
  merchants: Merchant[];
}

function useInitializeMerchant(merchants: Merchant[]) {
  const { state, dispatch } = useEventHandler();

  useEffect(() => {
    if (!state.markedMerchant) {
      dispatch({
        type: EventActionType.HANDLE_USER_SCROLL_AND_CAROUSEL_CLICK,
        payload: { merchant: merchants[0] },
      });
    }
  }, []);
}

function DesktopCards(merchants: Merchant[]) {
  return merchants.map((merchant) => <MerchantCard merchant={merchant} />);
}

function MobileCards(merchants: Merchant[], markedMerchant: Merchant | null) {
  return merchants.map((merchant, index) => {
    if (merchant.name === markedMerchant?.name) {
      return <MerchantCarousel index={index} merchants={merchants} />;
    }
    return <div />;
  });
}

function SideBar({ merchants }: SideBarProps) {
  const isMobile = useCheckIfMobile();
  const { state } = useEventHandler();

  useInitializeMerchant(merchants);

  return (
    <>
      <h1>Explore our merchants</h1>
      {isMobile
        ? MobileCards(merchants, state.markedMerchant)
        : DesktopCards(merchants)}
    </>
  );
}

export default SideBar;
