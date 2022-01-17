import "./MerchantList.scss";
import MerchantCard from "../MerchantCard/MerchantCard";
import { Merchant } from "../../utilities/types";
import MobileMerchantList from "./MobileMerchantList";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import MerchantCardExpanded from "../MerchantCard/MerchantCardExpanded";
import { useEffect } from "react";

interface MerchantListProps {
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
  const { state } = useEventHandler();

  // When user clicks "Back To Results" on MerchantCardExpanded,
  // this hook will take them back to their last scroll position
  useEffect(() => {
    if (!state.expandedView && state.lastYPosition !== null) {
      window.scrollTo(0, state.lastYPosition);
    }
  }, [state.expandedView]);

  return (
    <div className="Merchant--List">
      {state.markedMerchant && state.expandedView ? (
        <MerchantCardExpanded merchant={state.markedMerchant} />
      ) : (
        merchants.map((merchant) => <MerchantCard merchant={merchant} />)
      )}
    </div>
  );
}

function MobileCards({ merchants, markedMerchant }: MobileCardsProps) {
  const { state } = useEventHandler();
  if (merchants.length === 0) {
    return <div />;
  }
  if (!markedMerchant) {
    return <MobileMerchantList index={0} merchants={merchants} />;
  }
  return (
    <MobileMerchantList
      key={"Carousel_" + state.currentIndex}
      index={state.currentIndex}
      merchants={merchants}
    />
  );
}

function MerchantList({ merchants }: MerchantListProps) {
  const { state } = useEventHandler();

  return (
    <div className="Merchant--Container">
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

export default MerchantList;
