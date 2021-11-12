import { LatLong, Map } from "./map/Map";
import SideBar from "./side-bar/SideBar";
import "./App.css";
import { useContext, useState } from "react";
import { MerchantRefsContext } from "./utilities/MerchantRefsContext";
import { mockData } from "./utilities/mockData";

export type Merchant = {
  name: string;
  addressLine1: string;
  addressLine2: string;
  phoneNumber: string;
  websiteUrl: string;
  description: string;
  position: LatLong;
};

// Replace when we setup the API call
const mockMerchants: Merchant[] = mockData;

function App() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isMapClick, setIsMapClick] = useState(false);
  const [currentMerchant, setCurrentMerchant] = useState<Merchant | null>(
    mockMerchants.length > 0 ? mockMerchants[0] : null
  );

  const scrollToMerchant = (merchant: Merchant) => {
    const merchantDiv = merchantRefs[merchant.name];

    if (merchantDiv.current !== undefined) {
      merchantDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const panToMerchant = (merchant: Merchant) => {
    if (map) {
      map.panTo(merchant.position);
    }
  };

  const handleMerchantCardOnScreen = (
    isCardOnScreen: boolean,
    merchant: Merchant
  ) => {
    const isUserScroll: boolean = !isMapClick;

    // The map should pan to the merchant whose card is visible on screen
    // only if the user is scrolling on the sidebar.
    if (isCardOnScreen && isUserScroll) {
      setCurrentMerchant(merchant); // this will change the marker icon
      panToMerchant(merchant);
    }
    if (isCardOnScreen) {
      setIsMapClick(false);
    }
  };

  const handleMarkerClick = (merchant: Merchant) => {
    setCurrentMerchant(merchant);
    setIsMapClick(true);
    map && map.panTo(merchant.position);
    scrollToMerchant(merchant);
  };

  // TODO: Make function to handle assigning values to context variables
  const context = useContext(MerchantRefsContext);
  context.map = map;
  context.setMap = setMap;
  context.isMapClick = isMapClick;
  context.setIsMapClick = setIsMapClick;
  context.handleMerchantCardOnScreen = handleMerchantCardOnScreen;

  const merchantRefs = context.merchantRefs;

  return (
    <div id="app-container">
      <div id="sidebar-container">
        <SideBar merchants={mockMerchants} />
      </div>
      <div id="map-container">
        <Map
          merchants={mockMerchants}
          currentMerchant={currentMerchant}
          handleMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  );
}

export default App;
