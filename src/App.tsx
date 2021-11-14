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
  // TODO: Move states and event handler functions out of App component and into separate files
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentMerchant, setCurrentMerchant] = useState<Merchant | null>(
    mockMerchants.length > 0 ? mockMerchants[0] : null
  );
  const [clickedMerchant, setClickedMerchant] = useState<Merchant | null>(null);

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

  const handleUserSidebarScroll = (merchantOnScreen: Merchant) => {
    setCurrentMerchant(merchantOnScreen); // this will change the marker icon
    panToMerchant(merchantOnScreen);
  };

  const handleMapSidebarScroll = (merchantOnScreen: Merchant) => {
    if (clickedMerchant && clickedMerchant.name === merchantOnScreen.name) {
      setClickedMerchant(null);
    }
  };

  const handleSidebarScroll = (merchant: Merchant) => {
    const isUserScroll: boolean = clickedMerchant === null;

    if (isUserScroll) {
      handleUserSidebarScroll(merchant);
    } else {
      handleMapSidebarScroll(merchant);
    }
  };

  const handleMarkerClick = (merchant: Merchant) => {
    setCurrentMerchant(merchant);
    setClickedMerchant(merchant);
    panToMerchant(merchant);
    scrollToMerchant(merchant);
  };

  // TODO: Make function to handle assigning values to context variables
  const context = useContext(MerchantRefsContext);
  context.map = map;
  context.setMap = setMap;
  context.handleSidebarScroll = handleSidebarScroll;

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
