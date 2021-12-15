import { useEventHandler } from "../../utilities/EventHandlerContext";
import { Merchant } from "../../utilities/types";
import "./Header.scss";

interface HeaderProps {
  merchants: Merchant[];
}

interface MerchantCountProps {
  currentCount: number | undefined;
  numberOfMerchants: number | undefined;
}

export function Header({ merchants }: HeaderProps) {
  const { state } = useEventHandler();

  return (
    <div className="Header">
      <h1 className="Header--Title">Explore our merchants</h1>
      <div className="Header--Filters">
        <div className="Header--Buttons-Container">
          <div className="Header--Category-Dropdown">Location</div>
          <div className="Header--Category-Dropdown">Category</div>
          <div className="Header--Category-Dropdown">Cuisine</div>
        </div>
        <div className="Header--Filter-Count">
          {`${merchants.length} results`}
        </div>
      </div>
    </div>
  );
}
