import "./MerchantCard.css";
import { useRef } from "react";

import { Merchant } from "../utilities/types";
import { useHandleAutoScroll, useUpdateStateIfDivOnScreen } from "./hooks";

interface MerchantCardProps {
  merchant: Merchant;
}

function MerchantCard({ merchant }: MerchantCardProps) {
  // TODO: update ref type
  const ref: any = useRef<Element>(null);

  useUpdateStateIfDivOnScreen(merchant, ref);
  useHandleAutoScroll(merchant, ref);

  return (
    <div className="merchant-card" ref={ref}>
      <h2>{merchant.name}</h2>
      <p>{merchant.addressLine1}</p>
      <p>{merchant.addressLine2}</p>
      <p>{merchant.phoneNumber}</p>
      <a href={merchant.websiteUrl}>Website</a>
      <p>{merchant.description}</p>
      <a href="#">
        <button>Visit Merchant Page</button>
      </a>
      <div className="merchant-images"></div>
    </div>
  );
}

export default MerchantCard;
