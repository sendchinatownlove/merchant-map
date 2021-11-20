import "./SideBar.css";
import MerchantCard from "../merchant-card/MerchantCard";
import { Merchant } from "../utilities/types";
import { useCheckIfMobile } from "../utilities/useCheckIfMobile";
import { MerchantCarousel } from "./mobile/MerchantCarousel";
import { useEventHandler } from "../utilities/EventHandlerContext";

interface SideBarProps {
  merchants: Merchant[];
}

function DesktopCards(merchants: Merchant[]) {
  return merchants.map((merchant) => <MerchantCard merchant={merchant} />);
}

function MobileCards(merchants: Merchant[], markedMerchant: Merchant | null) {
  if (merchants.length === 0) {
    return <div />;
  }
  if (!markedMerchant) {
    return <MerchantCarousel index={0} merchants={merchants} />;
  }
  return merchants.map((merchant, index) => {
    if (merchant.name === markedMerchant?.name) {
      return <MerchantCarousel index={index} merchants={merchants} />;
    }
  });
}

function SideBar({ merchants }: SideBarProps) {
  const isMobile = useCheckIfMobile();
  const { state } = useEventHandler();

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
