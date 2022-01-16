import "./MerchantCard.scss";
import { useEffect, useRef, useState } from "react";

import { Merchant } from "../../utilities/types";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import { useHandleAutoScroll, useUpdateStateIfDivOnScreen } from "./hooks";
import { COLOR } from "../../utilities/colors";

interface MerchantCardProps {
  merchant: Merchant;
}

function MerchantCard({ merchant }: MerchantCardProps) {
  const { state } = useEventHandler();
  // TODO: update ref type
  const ref: any = useRef<Element>(null);
  const [selectedStyle, setSelectedStyle] = useState({});

  useEffect(() => {
    if (
      merchant.name == state.markedMerchant?.name &&
      merchant.address == state.markedMerchant?.address
    ) {
      setSelectedStyle({ backgroundColor: COLOR.GREY_6 });
    } else {
      setSelectedStyle({});
    }
  }, [state.markedMerchant]);

  useUpdateStateIfDivOnScreen(merchant, ref);
  useHandleAutoScroll(merchant, ref);

  return (
    <div style={selectedStyle} className="Merchant" ref={ref}>
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
    </div>
  );
}

export default MerchantCard;
