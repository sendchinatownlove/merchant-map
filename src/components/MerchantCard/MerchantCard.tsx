import "./MerchantCard.scss";
import { useRef } from "react";

import { Merchant } from "../../utilities/types";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import { useHandleAutoScroll, useUpdateStateIfDivOnScreen } from "./hooks";

interface MerchantCardProps {
  merchant: Merchant;
}

function MerchantCard({ merchant }: MerchantCardProps) {
  const { state } = useEventHandler();
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
          {merchant.websiteUrl && (
            <a className="Merchant--Details--Link" href={merchant.websiteUrl}>
              Website
            </a>
          )}
        </div>
      </div>
      <p className="Merchant--Description">{merchant.shortDescription}</p>

      {merchant.insiderTips && (
        <div className="Merchant--Insider-Tips">
          <h3 className="Merchant--Insider-Tips--Label">Insider Tips:&nbsp;</h3>
          <p className="Merchant--Insider-Tips--Text">{merchant.insiderTips}</p>
        </div>
      )}

      {!state.isMobile && (
        <div className="Merchant--Page-Container">
          <a href="#">
            <button className="Primary-Button--black">
              Visit Merchant Page
            </button>
          </a>
        </div>
      )}
      {/* <div className="Merchant--Images"></div> */}
    </div>
  );
}

export default MerchantCard;
