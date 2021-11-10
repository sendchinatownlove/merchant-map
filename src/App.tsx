import { LatLong, Map } from "./map/Map";
import SideBar from "./side-bar/SideBar";
import "./App.css";

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
];

function App() {
  return (
    <>
      <SideBar merchants={mockMerchants} />
      <Map merchants={mockMerchants} />
    </>
  );
}

export default App;
