import { Merchant } from "./types";

export type AppState = {
  map: google.maps.Map | null;
  markedMerchant: Merchant | null;
  clickedMerchant: Merchant | null;
  isMobile: boolean;
};

export enum EventActionType {
  "SET_MAP",
  "MARKER_CLICK",
  "HANDLE_USER_SCROLL_AND_CAROUSEL_CLICK",
  "HANDLE_AUTO_SCROLL_COMPLETE",
  "UPDATE_IF_MOBILE",
}

export type EventAction = {
  type: EventActionType;
  payload: {
    merchant?: Merchant;
    map?: google.maps.Map;
    isMobile?: boolean;
  };
};

export function reducer(state: AppState, action: EventAction): AppState {
  switch (action.type) {
    case EventActionType.SET_MAP: {
      if (action.payload.map) {
        return {
          ...state,
          map: action.payload.map,
        };
      }
    }
    case EventActionType.MARKER_CLICK: {
      const clickedMerchant = action.payload.merchant;
      if (clickedMerchant) {
        return { ...state, markedMerchant: clickedMerchant, clickedMerchant };
      }
      return {
        ...state,
      };
    }
    case EventActionType.HANDLE_USER_SCROLL_AND_CAROUSEL_CLICK: {
      if (action.payload.merchant) {
        return { ...state, markedMerchant: action.payload.merchant };
      }
    }
    case EventActionType.HANDLE_AUTO_SCROLL_COMPLETE: {
      return { ...state, clickedMerchant: null };
    }
    case EventActionType.UPDATE_IF_MOBILE: {
      if (action.payload.isMobile !== undefined) {
        return { ...state, isMobile: action.payload.isMobile };
      }
      return { ...state };
    }
    default:
      throw new Error();
  }
}
