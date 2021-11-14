import { LatLong, Map } from "./map/Map";
import SideBar from "./side-bar/SideBar";
import "./App.css";
import { mockData } from "./utilities/mockData";
import { EventHandlerProvider } from "./utilities/EventHandlerContext";

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
  return (
    <EventHandlerProvider>
      <div id="app-container">
        <div id="sidebar-container">
          <SideBar merchants={mockMerchants} />
        </div>
        <div id="map-container">
          <Map merchants={mockMerchants} />
        </div>
      </div>
    </EventHandlerProvider>
  );
}

export default App;
