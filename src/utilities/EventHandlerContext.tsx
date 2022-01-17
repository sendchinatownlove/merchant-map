import { createContext, useContext, useReducer } from "react";
import { AppState, EventAction, reducer } from "./handleEventReducer";

type EventHandlerContextValue = {
  state: AppState;
  dispatch: React.Dispatch<EventAction>;
};

const initialReducerState: AppState = {
  map: null,
  markedMerchant: null,
  clickedMerchant: null,
  isMobile: false,
  currentIndex: 0,
  expandedView: false,
  lastYPosition: null,
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
