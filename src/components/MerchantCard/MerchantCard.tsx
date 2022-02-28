import "./MerchantCard.scss";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Merchant } from "../../utilities/types";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import { updateScrollState, useHandleAutoScroll } from "./hooks";
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

  // Set the background color of the merchant marked on the map to grey
  useEffect(() => {
    if (state.expandedView || state.isMobile) {
      setSelectedStyle({});
    } else if (
      // TODO: Use merchant ID to check whether 2 merchants are the same
      merchant.name == state.markedMerchant?.name &&
      merchant.address == state.markedMerchant?.address
    ) {
      setSelectedStyle({ backgroundColor: COLOR.GREY_6, cursor: "pointer" });
    } else {
      setSelectedStyle({ cursor: "pointer" });
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

    // ensures that the top of the expanded view will be scrolled to
    window.scrollTo(0, 0);
  };

  useHandleAutoScroll(merchant, ref);

  // !isMobileNonExpandedView would be desktop and mobile expanded view.
  const isMobileNonExpandedView: boolean =
    state.isMobile && !state.expandedView;

  // build merchant url
  const pattern = new RegExp('^(https?|ftp)://');
  const websiteUrl;
  websiteUrl = merchant.websiteUrl && !pattern.test(merchant.websiteUrl) ? "http://" + merchant.websiteUrl : merchant.websiteUrl;

  return (
    <div
      style={selectedStyle}
      onClick={handleClick}
      onMouseOver={() =>
        !state.isMobile && updateScrollState(merchant, state, dispatch)
      }
      className="Merchant"
      ref={ref}
    >
      <div
        className="Merchant--Text"
        style={merchant.heroURL && !state.isMobile ? merchantTextStyle : {}}
      >
        <h2 className="Merchant--Name">{merchant.name}</h2>
        <div className="Merchant--Details">
          <div className="Merchant--Details--Row">
            <p className="Merchant--Details--Item">{merchant.address}</p>
            <p className="Merchant--Details--Item">{merchant.phoneNumber}</p>
          </div>
          <div className="Merchant--Details--Row">
            {merchant.websiteUrl && (
              <a className="Merchant--Details--Link" href={websiteUrl} >
                Website
              </a>
            )}
          </div>
        </div>
        {!isMobileNonExpandedView && (
          <p className="Merchant--Description">
            <ReactMarkdown>{merchant.shortDescription}</ReactMarkdown>
          </p>
        )}

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
      {!isMobileNonExpandedView && merchant.heroURL && (
        <img className="Merchant--Image" src={merchant.heroURL} />
      )}
    </div>
  );
}

export default MerchantCard;
