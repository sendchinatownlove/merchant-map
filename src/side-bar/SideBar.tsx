import "./SideBar.css";
import MerchantCard from "../merchant-card/MerchantCard";
import { Merchant } from "../utilities/types";
import { useCheckIfMobile } from "../utilities/useCheckIfMobile";
import { MerchantCarousel } from "./mobile/MerchantCarousel";
import { useEventHandler } from "../utilities/EventHandlerContext";
import { useEffect } from "react";
import { EventActionType } from "../utilities/handleEventReducer";

interface SideBarProps {
  merchants: Merchant[];
}

interface DesktopCardsProps {
  merchants: Merchant[];
}

interface MobileCardsProps {
  merchants: Merchant[];
  markedMerchant: Merchant | null;
}
function DesktopCards({ merchants }: DesktopCardsProps) {
  return (
    <>
      {merchants.map((merchant) => (
        <MerchantCard merchant={merchant} />
      ))}
    </>
  );
}

function MobileCards({ merchants, markedMerchant }: MobileCardsProps) {
  if (merchants.length === 0) {
    return <div />;
  }
  if (!markedMerchant) {
    return <MerchantCarousel index={0} merchants={merchants} />;
  }
  return (
    <>
      {merchants.map((merchant, index) => {
        if (merchant.name === markedMerchant?.name)
          return (
            <MerchantCarousel
              key={"Carousel_" + merchant.name + index}
              index={index}
              merchants={merchants}
            />
          );
      })}
    </>
  );
}

function useUpdateDeviceTypeState() {
  const { dispatch } = useEventHandler();
  const isMobile = useCheckIfMobile();

  useEffect(() => {
    dispatch({
      type: EventActionType.UPDATE_IF_MOBILE,
      payload: { isMobile },
    });
  }, [isMobile]);
}

function SideBar({ merchants }: SideBarProps) {
  const { state } = useEventHandler();

  useUpdateDeviceTypeState();

  return (
    <>
      <h1>Explore our merchants</h1>
      {state.isMobile ? (
        <MobileCards
          merchants={merchants}
          markedMerchant={state.markedMerchant}
        />
      ) : (
        <DesktopCards merchants={merchants} />
      )}
    </>
  );
}

export default SideBar;
