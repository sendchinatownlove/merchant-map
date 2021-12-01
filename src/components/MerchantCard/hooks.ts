import { useEffect } from "react";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import {
  AppState,
  EventAction,
  EventActionType,
} from "../../utilities/handleEventReducer";
import { Merchant } from "../../utilities/types";
import { useElementOnScreen } from "../../utilities/useElementOnScreen";

// Hook that updates the state whenever the MerchantCard appears on screen
export function useUpdateStateIfDivOnScreen(merchant: Merchant, ref: any) {
  const { state, dispatch } = useEventHandler();
  const isDivOnScreen: boolean = useElementOnScreen(ref, "-300px");

  useEffect(() => {
    if (isDivOnScreen) {
      updateScrollState(merchant, state, dispatch);
    }
  }, [isDivOnScreen]);
}

// Hook that scrolls to clickedMerchant if there is a clickedMerchant.
export function useHandleAutoScroll(merchant: Merchant, ref: any) {
  const { state } = useEventHandler();

  useEffect(() => {
    const isClickedMerchant: boolean =
      state.clickedMerchant?.name === merchant.name;

    if (isClickedMerchant && !state.isMobile) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.clickedMerchant]);
}

// Helper functions for updating state

function updateAutoScrollState(
  merchantOnScreen: Merchant,
  state: AppState,
  dispatch: React.Dispatch<EventAction>
) {
  const isAutoScrollFinished: boolean =
    state.clickedMerchant?.name === merchantOnScreen.name;

  if (isAutoScrollFinished) {
    dispatch({
      type: EventActionType.HANDLE_AUTO_SCROLL_COMPLETE,
      payload: { merchant: merchantOnScreen },
    });
  }
}

function updateScrollState(
  merchantOnScreen: Merchant,
  state: AppState,
  dispatch: React.Dispatch<EventAction>
) {
  const isUserSidebarScroll: boolean = state.clickedMerchant === null;

  if (isUserSidebarScroll) {
    dispatch({
      type: EventActionType.HANDLE_USER_SCROLL_AND_CAROUSEL_CLICK,
      payload: { merchant: merchantOnScreen },
    });
  } else {
    updateAutoScrollState(merchantOnScreen, state, dispatch);
  }
}
