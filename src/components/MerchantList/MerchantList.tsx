import "./MerchantList.scss";
import MerchantCard from "../MerchantCard/MerchantCard";
import { Merchant } from "../../utilities/types";
import MobileMerchantList from "./MobileMerchantList";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import MerchantCardExpanded from "../MerchantCard/MerchantCardExpanded";
import { useEffect, useState } from "react";
import { COLOR } from "../../utilities/colors";

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

function HorizontalLine({ color }: { color: string }) {
  return (
    <div
      style={{
        width: "100%",
        borderBottom: `1px solid ${color}`,
      }}
    />
  );
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
        merchants.map((merchant, index) => (
          <>
            <MerchantCard merchant={merchant} />
            {index !== merchants.length - 1 && (
              <HorizontalLine color={COLOR.GREY_3} />
            )}
          </>
        ))
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
  const [expandedMobileView, setExpandedMobileView] = useState<boolean>(false)
  const { state } = useEventHandler();

  return (
    <div className={`Merchant--Container${expandedMobileView ? '--Expanded' : ''}`}>
      {state.isMobile ? (
        <MobileCards
          merchants={merchants}
          markedMerchant={state.markedMerchant}
          setExpandedMobileView={setExpandedMobileView}
        />
      ) : (
        <DesktopCards merchants={merchants} />
      )}
    </div>
  );
}

export default MerchantList;
