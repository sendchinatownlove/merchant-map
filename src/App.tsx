import Map from "./components/Map";
import Header from "./components/Header";
import { MerchantList } from "./components/MerchantList";
import "./App.scss";
import { mockData } from "./utilities/mockData";
import {
  EventHandlerProvider,
  useEventHandler,
} from "./utilities/EventHandlerContext";
import { Merchant } from "./utilities/types";
import { useCheckIfMobile } from "./utilities/useCheckIfMobile";
import { useEffect } from "react";
import { EventActionType } from "./utilities/handleEventReducer";

// Replace when we setup the API call
const mockMerchants: Merchant[] = mockData;

// Hook that updates the isMobile state whenever the device changes
function useUpdateDeviceTypeState() {
  const { dispatch } = useEventHandler();
  const isMobile = useCheckIfMobile();

  useEffect(() => {
    dispatch({
      type: EventActionType.UPDATE_IF_MOBILE,
      payload: { isMobile },
    });
  }, [isMobile]);
}

function MainContent() {
  const { state } = useEventHandler();
  return (
    <div id="app-container">
    {
      state.isMobile ? (
          <div id="merchants-container">
            <Header merchants={mockMerchants} />
            <Map merchants={mockMerchants} />
            <MerchantList merchants={mockMerchants} />
          </div>
      ) : (
        <>
          <div id="merchants-container">
            <Header merchants={mockMerchants} />
            <MerchantList merchants={mockMerchants} />
          </div>
          <Map merchants={mockMerchants} />
        </>
      )
    }
    </div>
  );
}

// Things like side effects that we want handled at the app-level can go
// inside the AppContainer
function AppContainer({ children }: any) {
  useUpdateDeviceTypeState();

  return <>{children}</>;
}

function App() {
  return (
    <EventHandlerProvider>
      <AppContainer>
          <div id="app-container">
            <MainContent />
          </div>
      </AppContainer>
    </EventHandlerProvider>
  );
}

export default App;
