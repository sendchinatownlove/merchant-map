import "./SideBar.css";
import MerchantCard from "../merchant-card/MerchantCard";
import { Merchant } from "../utilities/types";
import { useCheckIfMobile } from "../utilities/useCheckIfMobile";
import { MerchantCarousel } from "./mobile/MerchantCarousel";

interface SideBarProps {
  merchants: Merchant[];
}

function SideBar({ merchants }: SideBarProps) {
  const isMobile = useCheckIfMobile();

  return (
    <>
      <h1>Explore our merchants</h1>
      {isMobile ? (
        <MerchantCarousel merchants={merchants} />
      ) : (
        merchants.map((merchant) => <MerchantCard merchant={merchant} />)
      )}
    </>
  );
}

export default SideBar;
