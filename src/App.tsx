import Map from "./components/Map";
// import {MerchantList, MobileMerchantList} from "./components/MerchantList";
import {MerchantList} from "./components/MerchantList";
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
          <MerchantList merchants={mockMerchants} />
          <div id="map-container">
            <Map merchants={mockMerchants} />
          </div>
        </div>
      </AppContainer>
    </EventHandlerProvider>
  );
}

export default App;
