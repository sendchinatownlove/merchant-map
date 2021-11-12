import "./SideBar.css";
import MerchantCard from "../merchant-card/MerchantCard";
import { Merchant } from "../App";

interface SideBarProps {
  merchants: Merchant[];
  currentMerchant: Merchant | null;
  setCurrentMerchant: React.Dispatch<React.SetStateAction<Merchant | null>>;
}

function SideBar({ merchants, setCurrentMerchant }: SideBarProps) {
  return (
    <>
      <h1>Explore our merchants</h1>
      {merchants.map((merchant) => (
        <MerchantCard merchant={merchant} />
      ))}
    </>
  );
}

export default SideBar;
