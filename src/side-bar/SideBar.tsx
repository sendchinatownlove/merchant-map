import "./SideBar.css";
import MerchantCard from "../merchant-card/MerchantCard";
import { Merchant } from "../App";

interface SideBarProps {
  merchants: Merchant[];
}

function SideBar({ merchants }: SideBarProps) {
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
