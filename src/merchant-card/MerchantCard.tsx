import { Merchant } from "../App";
import "./MerchantCard.css";
import { useOnScreen } from "../utilities/hooks/useOnScreen";
import { useEffect, useRef } from "react";

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
  const style = isCurrentMerchant ? { color: "red" } : {};

  const ref: any = useRef<HTMLDivElement>();
  const onScreen: boolean = useOnScreen(ref, "-300px");

  // Update current merchant whenever the merchant's MerchantCard is in the viewport
  useEffect(() => {
    if (onScreen) {
      setCurrentMerchant(merchant);
    }
  }, [onScreen]);

  return (
    <div style={{ width: "300px", height: "800px" }} ref={ref}>
      <h2 style={style}>{merchant.name}</h2>
      <p>{merchant.addressLine1}</p>
      <p>{merchant.addressLine2}</p>
      <p>{merchant.phoneNumber}</p>
      <a href={merchant.websiteUrl}>Website</a>
      <p>{merchant.description}</p>
      <div style={{ height: "400px", width: "300px" }}></div>

      <a href="#">
        <button>Visit Merchant Page</button>
      </a>
    </div>
  );
}

export default MerchantCard;
