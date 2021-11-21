import { useEffect } from "react";
import { useEventHandler } from "../utilities/EventHandlerContext";
import { EventAction, EventActionType } from "../utilities/handleEventReducer";
import { Merchant } from "../utilities/types";

const selectedMarkerIcon =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

const unselectedMarkericon = "";

// Store the index of the clicked merchant. Used in the MerchantCarousel component.
// When a user clicks on a merchant on the map in the mobile version, we can display
// the corresponding merchant by using the currentIndex and indexing on the data array.
function useUpdateClickedMerchantIndex(
  clickedMerchant: Merchant,
  merchants: Merchant[],
  dispatch: React.Dispatch<EventAction>
) {
  const currentIndex = getClickedMerchantIndex(clickedMerchant, merchants);

  dispatch({
    type: EventActionType.UPDATE_MERCHANT_INDEX,
    payload: { currentIndex },
  });
}

function getClickedMerchantIndex(
  clickedMerchant: Merchant,
  merchants: Merchant[]
): number {
  for (let i = 0; i < merchants.length; i++) {
    if (merchants[i].name === clickedMerchant.name) {
      return i;
    }
  }
  return 0;
}

export function handleMarkerClick(
  merchant: Merchant,
  merchants: Merchant[],
  dispatch: React.Dispatch<EventAction>,
  isMobile: boolean
): void {
  dispatch({
    type: EventActionType.MARKER_CLICK,
    payload: { merchant },
  });

  if (isMobile) {
    useUpdateClickedMerchantIndex(merchant, merchants, dispatch);
  }
}

export function selectMarkerIcon(merchant: Merchant) {
  const { state } = useEventHandler();

  if (state.markedMerchant && merchant.name === state.markedMerchant.name) {
    return selectedMarkerIcon;
  }
  return unselectedMarkericon;
}

//  Hook that handles map panning
export function useHandleMapEvents() {
  const { state } = useEventHandler();

  // Pan the map to the markedMerchant if markedMerchant is updated
  useEffect(() => {
    if (state.markedMerchant) {
      state.map?.panTo(state.markedMerchant.position);
    }
  }, [state.markedMerchant]);

  // Pan the map to the clickedMerchant if clickedMerchant is updated
  useEffect(() => {
    if (state.clickedMerchant) {
      state.map?.panTo(state.clickedMerchant?.position);
    }
  }, [state.clickedMerchant]);
}
