import { Merchant } from "./types";

export type AppState = {
  map: google.maps.Map | null;
  markedMerchant: Merchant | null;
  clickedMerchant: Merchant | null;
  merchantRefs: { [key: string]: any };
};

export enum EventActionType {
  "SET_MAP",
  "MARKER_CLICK",
  "STORE_MERCHANT_REF",
  "HANDLE_DIV_ON_SCREEN",
}

type EventAction = {
  type: EventActionType;
  payload: {
    merchant: Merchant;
    ref: React.RefObject<Element>;
    map: google.maps.Map;
  };
};

export function reducer(state: AppState, action: EventAction): AppState {
  switch (action.type) {
    case EventActionType.SET_MAP: {
      return {
        ...state,
        map: action.payload.map,
      };
    }
    case EventActionType.MARKER_CLICK: {
      // when a user clicks a marker, map will pan to the clicked merchant
      // and the sidebar will scroll to the merchant
      const clickedMerchant = action.payload.merchant;
      const merchantDiv = state.merchantRefs[clickedMerchant.name];
      state.map?.panTo(clickedMerchant.position);

      // scroll to merchant
      if (merchantDiv && merchantDiv.current !== undefined) {
        merchantDiv.current.scrollIntoView({ behavior: "smooth" });
      }
      return {
        ...state,
        markedMerchant: action.payload.merchant,
        clickedMerchant: action.payload.merchant,
      };
    }
    case EventActionType.STORE_MERCHANT_REF: {
      if (state.merchantRefs[action.payload.merchant.name] === undefined) {
        return {
          ...state,
          merchantRefs: {
            ...state.merchantRefs,
            [action.payload.merchant.name]: action.payload.ref,
          },
        };
      }

      return { ...state };
    }
    case EventActionType.HANDLE_DIV_ON_SCREEN: {
      // when a div appears on the screen:
      // 1) if a div appears due to a user scrolling, then pan the map.
      // 2) if a div appears due to both a user clicking on the map and
      // the map "auto-scrolling" to the clicked merchant, then do not pan the map
      // because the map is still scrolling to the clicked merchant.
      //
      // Auto-scrolling is finished when the clickedMerchant matches the merchant on screen,
      // in which case we can set clickedMerchant to null so that the map can pan to the
      // merchant that appears on the screen as a user scrolls.

      const isUserSidebarScroll: boolean = state.clickedMerchant === null;
      const isMapSidebarScroll: boolean = !isUserSidebarScroll;
      const isAutoScrollFinished: boolean = state.clickedMerchant
        ? state.clickedMerchant.name === action.payload.merchant.name
        : false;

      if (isUserSidebarScroll) {
        state.map?.panTo(action.payload.merchant.position);
        return { ...state, markedMerchant: action.payload.merchant };
      } else if (isMapSidebarScroll && isAutoScrollFinished) {
        return { ...state, clickedMerchant: null };
      }
      return { ...state };
    }
    default:
      throw new Error();
  }
}
