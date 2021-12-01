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

function MerchantCount({
  currentCount,
  numberOfMerchants
}: MerchantCountProps) {

  if (
    currentCount !== undefined &&
    numberOfMerchants !== undefined
  ) {
    return (
        <div className="Header--Filter-Count">
          {currentCount} out of {numberOfMerchants}
        </div>
    );
  }

  return <div />;
}

export function Header({ merchants }: HeaderProps) {
  const { state } = useEventHandler();

  return (
    <div className="Header">
      <h1 className="Header--Title">Explore our merchants</h1>
      <div className="Header--Filters">
        
        <div className="Header--Category-Container">
          <div className="Header--Category-Dropdown">Location</div>
          <div className="Header--Category-Dropdown">Category</div>
          <div className="Header--Category-Dropdown">Cuisine</div>
        </div>
        <MerchantCount currentCount={state.currentIndex} numberOfMerchants={merchants.length}/>
      </div>

    </div>
  );
}