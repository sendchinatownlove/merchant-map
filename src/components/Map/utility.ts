import { useEffect } from "react";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import {
  EventAction,
  EventActionType,
} from "../../utilities/handleEventReducer";
import { Merchant } from "../../utilities/types";
import { activeMarker, defaultMarker } from "./markers";

// Store the index of the clicked merchant. Used in the MobileMerchantList component.
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
  return merchants.findIndex(
    (merchant) => merchant.name === clickedMerchant.name
  );
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

export function selectMarkerIcon(merchant: Merchant): google.maps.Icon {
  const { state } = useEventHandler();
  const marker: google.maps.Icon = { url: "" };

  if (state.markedMerchant && merchant.name === state.markedMerchant.name) {
    marker.url = svgToDataUrl(activeMarker);
  } else {
    marker.url = svgToDataUrl(defaultMarker);
  }
  return marker;
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

/**
 * Creates the data URL for a SVG image.
 * See more information on data URLs
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * https://stackoverflow.com/questions/66268996/how-to-use-svg-with-multiple-paths-in-google-maps-marker-javascript
 * @param svg XML of a SVG file as a string.
 */
function svgToDataUrl(svg: string): string {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
