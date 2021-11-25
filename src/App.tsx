import { Map } from "./map/Map";
import SideBar from "./side-bar/SideBar";
import "./App.css";
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
  const data = useFetchMerchants();

  if (data.length === 0) {
    return <div />;
  }
  console.log(data);
  return (
    <EventHandlerProvider>
      <AppContainer>
        <div id="app-container">
          <div id="sidebar-container">
            <SideBar merchants={data} />
          </div>
          <div id="map-container">
            <Map merchants={data} />
          </div>
        </div>
      </AppContainer>
    </EventHandlerProvider>
  );
}

export default App;
