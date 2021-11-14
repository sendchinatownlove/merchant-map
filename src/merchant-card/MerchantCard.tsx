import { Merchant } from "../App";
import "./MerchantCard.css";
import { useElementOnScreen } from "../utilities/useElementOnScreen";
import { useContext, useEffect, useRef } from "react";
import { MerchantRefsContext } from "../utilities/MerchantRefsContext";

interface MerchantCardProps {
  merchant: Merchant;
}

function MerchantCard({ merchant }: MerchantCardProps) {
  // TODO: update ref type
  const ref: any = useRef<Element>();
  const isDivOnScreen: boolean = useElementOnScreen(ref, "-300px");
  const { merchantRefs, handleSidebarScroll } = useContext(MerchantRefsContext);

  merchantRefs[merchant.name] = ref;

  useEffect(() => {
    if (isDivOnScreen) {
      handleSidebarScroll(merchant);
    }
  }, [isDivOnScreen]);

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
