import { Merchant } from "../App";
import "./MerchantCard.css";
import { useOnScreen } from "../utilities/hooks/useOnScreen";
import { useContext, useEffect, useRef } from "react";
import { MerchantRefsContext } from "../utilities/hooks/MerchantRefsContext";

interface MerchantCardProps {
  merchant: Merchant;
  isCurrentMerchant: boolean;
  setCurrentMerchant: React.Dispatch<React.SetStateAction<Merchant | null>>;
}

function MerchantCard({
  merchant,
  isCurrentMerchant,
  setCurrentMerchant,
}: MerchantCardProps) {
  // TODO: update ref type
  const ref: any = useRef<Element>();
  const onScreen: boolean = useOnScreen(ref, "-300px");
  const { merchantRefs, map, isMapClick, setIsMapClick } =
    useContext(MerchantRefsContext);
  merchantRefs[merchant.name] = ref;

  // Update current merchant whenever the merchant's MerchantCard is in the viewport
  useEffect(() => {
    if (onScreen && map && !isMapClick) {
      map.panTo(merchant.position);
      setCurrentMerchant(merchant);
    }
    setIsMapClick(false);
  }, [onScreen]);

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
