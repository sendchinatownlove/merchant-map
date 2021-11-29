import "./MerchantCard.scss";
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
    <div className="Merchant" ref={ref}>
      <h2 className="Merchant--Name">{merchant.name}</h2>
      <div className="Merchant--Details">
        <div className="Merchant--Details--Row">
          <p className="Merchant--Details--Item">{merchant.address}</p>
          <p className="Merchant--Details--Item">{merchant.phoneNumber}</p>
        </div>
        <div className="Merchant--Details--Row">
          <a className="Merchant--Details--Link" href={merchant.websiteUrl}>
            Website
          </a>
        </div>
      </div>
      <p className="Merchant--Description">{merchant.description}</p>
      <p className="Merchant--Insider-Tips-Label">Insider Tips</p>
      <div className="Merchant--Page-Container">
        <a href="#">
          <button className="Primary-Button--black">Visit Merchant Page</button>
        </a>
      </div>
      <div className="Merchant--Images"></div>
    </div>
  );
}

export default MerchantCard;
