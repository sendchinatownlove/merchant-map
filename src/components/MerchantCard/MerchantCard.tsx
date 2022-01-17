import "./MerchantCard.scss";
import { useEffect, useRef, useState } from "react";

import { Merchant } from "../../utilities/types";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import { useHandleAutoScroll, useUpdateStateIfDivOnScreen } from "./hooks";
import { COLOR } from "../../utilities/colors";
import { EventActionType } from "../../utilities/handleEventReducer";

interface MerchantCardProps {
  merchant: Merchant;
}

function MerchantCard({ merchant }: MerchantCardProps) {
  const { state, dispatch } = useEventHandler();
  // TODO: update ref type
  const ref: any = useRef<Element>(null);
  const [selectedStyle, setSelectedStyle] = useState({});

  // 211px = image width; 20px = padding between image + text; 36px = left padding
  const merchantTextStyle = { width: "calc(100% - 211px - 20px - 36px)" };

  useEffect(() => {
    if (
      !state.expandedView &&
      merchant.name == state.markedMerchant?.name &&
      merchant.address == state.markedMerchant?.address
    ) {
      setSelectedStyle({ backgroundColor: COLOR.GREY_6 });
    } else {
      setSelectedStyle({});
    }
  }, [state.markedMerchant]);

  const handleClick = () => {
    dispatch({
      type: EventActionType.SET_MERCHANT_CARD_EXPANDED_VIEW,
      payload: {
        expandedView: true,
        merchant: merchant,
      },
    });

    dispatch({
      type: EventActionType.UPDATE_LAST_Y_POSITION,
      payload: {
        lastYPosition: window.scrollY,
      },
    });
  };

  // TODO: Replace user-scroll triggering map pan behavior so that mouseover triggers map pan
  useUpdateStateIfDivOnScreen(merchant, ref);
  useHandleAutoScroll(merchant, ref);

  return (
    <div
      style={selectedStyle}
      onClick={handleClick}
      className="Merchant"
      ref={ref}
    >
      <div
        className="Merchant--Text"
        style={merchant.imageUrl ? merchantTextStyle : {}}
      >
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
            <h3 className="Merchant--Insider-Tips--Label">
              Insider Tips:&nbsp;
            </h3>
            <p className="Merchant--Insider-Tips--Text">
              {merchant.insiderTips}
            </p>
          </div>
        )}
      </div>
      {merchant.imageUrl && (
        <img className="Merchant--Image" src={merchant.imageUrl} />
      )}
    </div>
  );
}

export default MerchantCard;
