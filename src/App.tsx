import { Map } from "./map/Map";
import SideBar from "./side-bar/SideBar";
import "./App.css";
import { mockData } from "./utilities/mockData";
import { EventHandlerProvider } from "./utilities/EventHandlerContext";
import { Merchant } from "./utilities/types";

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
