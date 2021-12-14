import { useEventHandler } from "../../utilities/EventHandlerContext";
import { EventActionType } from "../../utilities/handleEventReducer";
import { Merchant } from "../../utilities/types";

/**
 * Initializes the `markedMerchant` state with `merchant` if `markedMerchant` is null.
 * @param merchant
 */
export function useInitializeMarkedMerchant(merchant: Merchant): void {
  const { state, dispatch } = useEventHandler();

  if (state.markedMerchant === null) {
    dispatch({
      type: EventActionType.INITIALIZE_MARKED_MERCHANT,
      payload: { merchant },
    });
  }
}
