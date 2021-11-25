import "./MerchantCard.css";
import { useRef } from "react";

import { Merchant } from "../utilities/types";
import { useHandleAutoScroll, useUpdateStateIfDivOnScreen } from "./hooks";
import { useEventHandler } from "../utilities/EventHandlerContext";

interface MerchantCardProps {
  merchant: Merchant;
  index?: number;
  numberOfMerchants?: number;
}

interface MerchantCountProps {
  currentCount: number | undefined;
  numberOfMerchants: number | undefined;
}

function MerchantCount({
  currentCount,
  numberOfMerchants,
}: MerchantCountProps) {
  const { state } = useEventHandler();

  if (
    state.isMobile &&
    currentCount !== undefined &&
    numberOfMerchants !== undefined
  ) {
    return (
      <>
        {currentCount} out of {numberOfMerchants}
      </>
    );
  }

  return <div />;
}

function MerchantCard({
  merchant,
  index,
  numberOfMerchants,
}: MerchantCardProps) {
  // TODO: update ref type
  const ref: any = useRef<Element>(null);

  useUpdateStateIfDivOnScreen(merchant, ref);
  useHandleAutoScroll(merchant, ref);

  return (
    <div className="merchant-card" ref={ref}>
      <p>
        <MerchantCount
          currentCount={index !== undefined ? index + 1 : 0}
          numberOfMerchants={numberOfMerchants ? numberOfMerchants : 0}
        />
      </p>
      <h2>{merchant.name}</h2>
      <p>{merchant.address}</p>
      <p>{merchant.phoneNumber}</p>
      <a href={merchant.websiteUrl}>Website</a>
      <p>{merchant.shortDescription}</p>
      <a href="#">
        <button>Visit Merchant Page</button>
      </a>
      <div className="merchant-images"></div>
    </div>
  );
}

export default MerchantCard;
