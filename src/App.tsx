import { LatLong, Map } from "./map/Map";
import SideBar from "./side-bar/SideBar";
import "./App.css";
import { useContext, useState } from "react";
import { MerchantRefsContext } from "./utilities/MerchantRefsContext";

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
const mockMerchants: Merchant[] = [
  {
    name: "Chef Katsu",
    addressLine1: "143 Greene Ave",
    addressLine2: "Brooklyn, NY 11238",
    phoneNumber: "696-420-4200",
    websiteUrl: "https://www.reddit.com/r/nba",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam imperdiet ultricies massa in eget sit tellus. Odio neque diam commodo, eget magna id odio vitae purus. Erat semper in ligula amet gravida tellus.",
    position: { lat: 40.6868, lng: -73.9685065 },
  },

  {
    name: "Win Son",
    addressLine1: "159 Graham Avenue",
    addressLine2: "Brooklyn, NY 11206",
    phoneNumber: "941-321-3123",
    websiteUrl: "https://www.reddit.com/r/movingtojapan",
    description:
      "Bacon ipsum dolor amet alcatra pork shankle, picanha jerky filet mignon brisket beef ribs strip steak. Turkey shoulder ham, shankle chuck tenderloin bacon frankfurter alcatra tail cupim boudin. Swine bacon chuck prosciutto. Short loin bresaola burgdoggen salami andouille capicola short ribs hamburger frankfurter pork rump kevin biltong landjaeger filet mignon.",
    position: { lat: 40.7074661, lng: -73.9456839 },
  },

  {
    name: "Yue Wong",
    addressLine1: "60 Bayard Street",
    addressLine2: "New York, NY 10013",
    phoneNumber: "929-285-7263",
    websiteUrl: "https://www.reddit.com/r/movingtojapan",
    description:
      "Bacon ipsum dolor amet alcatra pork shankle, picanha jerky filet mignon brisket beef ribs strip steak. Turkey shoulder ham, shankle chuck tenderloin bacon frankfurter alcatra tail cupim boudin. Swine bacon chuck prosciutto. Short loin bresaola burgdoggen salami andouille capicola short ribs hamburger frankfurter pork rump kevin biltong landjaeger filet mignon.",
    position: { lat: 40.7155392, lng: -73.9999976 },
  },
];

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
    if (isCardOnScreen && !isMapClick) {
      setCurrentMerchant(merchant);
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
        <SideBar
          merchants={mockMerchants}
          currentMerchant={currentMerchant}
          setCurrentMerchant={setCurrentMerchant}
        />
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
