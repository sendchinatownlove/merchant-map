import Map from "./components/Map";
import Header from "./components/Header";
import "./App.scss";
import {
  EventHandlerProvider,
  useEventHandler,
} from "./utilities/EventHandlerContext";
import { useCheckIfMobile } from "./utilities/useCheckIfMobile";
import { useEffect } from "react";
import { EventActionType } from "./utilities/handleEventReducer";
import { useFetchMerchants } from "./utilities/api/useFetchMerchants";
import { MerchantList } from "./components/MerchantList";

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
    <div id="app-container">
      {state.isMobile ? (
        <div id="merchants-container">
          <Header merchants={fetchedData.data} />
          <Map merchants={fetchedData.data} />
          <MerchantList merchants={fetchedData.data} />
        </div>
      ) : (
        <>
          <div id="merchants-container">
            <Header merchants={fetchedData.data} />
            <MerchantList merchants={fetchedData.data} />
          </div>
          <Map merchants={fetchedData.data} />
        </>
      )}
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
