import "./SideBar.scss";
import MerchantCard from "../../merchant-card/MerchantCard";
import { Merchant } from "../../utilities/types";
import { MerchantCarousel } from "./mobile/MerchantCarousel";
import { useEventHandler } from "../../utilities/EventHandlerContext";

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
    <div className="Merchant--List">
      {merchants.map((merchant) => (
        <MerchantCard merchant={merchant} />
      ))}
    </div>
  );
}

function MobileCards({ merchants, markedMerchant }: MobileCardsProps) {
  const { state } = useEventHandler();
  if (merchants.length === 0) {
    return <div />;
  }
  if (!markedMerchant) {
    return <MerchantCarousel index={0} merchants={merchants} />;
  }
  return (
    <MerchantCarousel
      key={"Carousel_" + state.currentIndex}
      index={state.currentIndex}
      merchants={merchants}
    />
  );
}

function SideBar({ merchants }: SideBarProps) {
  const { state } = useEventHandler();

  return (
    <div className="Merchant--Container">
      <h1 className="Header">Explore our merchants</h1>
      {state.isMobile ? (
        <MobileCards
          merchants={merchants}
          markedMerchant={state.markedMerchant}
        />
      ) : (
        <DesktopCards merchants={merchants} />
      )}
    </div>
  );
}

export default SideBar;
