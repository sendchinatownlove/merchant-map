import { Map } from "./map/Map";
import SideBar from "./components/SideBar/SideBar";
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
import { useFetchMerchants } from "./utilities/api/useFetchMerchants";

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
  const fetchedData = useFetchMerchants();

  // TODO: Add views for whether the data is loading, has an error, or if there is no data
  if (fetchedData.error) {
    return <div />;
  }
  if (fetchedData.loading) {
    return <div />;
  }
  if (!fetchedData.error && fetchedData.data.length === 0) {
    return <div />;
  }
  return (
    <EventHandlerProvider>
      <AppContainer>
        <div id="app-container">
          <SideBar merchants={fetchedData.data} />
          <div id="map-container">
            <Map merchants={fetchedData.data} />
          </div>
        </div>
      </AppContainer>
    </EventHandlerProvider>
  );
}

export default App;
