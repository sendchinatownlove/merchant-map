import { createContext, useContext, useReducer } from "react";
import { AppState, reducer } from "./handleEventReducer";

type EventHandlerContextValue = {
  state: AppState;
  dispatch: React.Dispatch<any>;
};

const initialReducerState: AppState = {
  map: null,
  markedMerchant: null,
  clickedMerchant: null,
  merchantRefs: {},
};

const initialContextValue: EventHandlerContextValue = {
  state: initialReducerState,
  dispatch: () => {},
};

const EventHandlerContext = createContext(initialContextValue);

export function EventHandlerProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialReducerState);

  const values: EventHandlerContextValue = {
    state,
    dispatch,
  };

  return (
    <EventHandlerContext.Provider value={values}>
      {children}
    </EventHandlerContext.Provider>
  );
}

export const useEventHandler = () => useContext(EventHandlerContext);
