import Map from "./map/Map";
import SideBar from "./side-bar/SideBar";
import "./App.css";

export type Merchant = {
	name: string;
	addressLine1: string;
	addressLine2: string;
	phoneNumber: string;
	websiteUrl: string;
	description: string;
}

// Replace when we setup the API call
const mockMerchants: Merchant[] = [
  {
    name: 'Chef Katsu',
    addressLine1: '345 Fulton Street',
    addressLine2: 'Brooklyn, NY 11222',
    phoneNumber: '696-420-4200',
    websiteUrl: 'https://www.reddit.com/r/nba',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam imperdiet ultricies massa in eget sit tellus. Odio neque diam commodo, eget magna id odio vitae purus. Erat semper in ligula amet gravida tellus.'
  },
  {
    name: 'Win Son',
    addressLine1: '235 Mortimer Street',
    addressLine2: 'Brooklyn, NY 101023',
    phoneNumber: '941-321-3123',
    websiteUrl: 'https://www.reddit.com/r/movingtojapan',
    description: 'Bacon ipsum dolor amet alcatra pork shankle, picanha jerky filet mignon brisket beef ribs strip steak. Turkey shoulder ham, shankle chuck tenderloin bacon frankfurter alcatra tail cupim boudin. Swine bacon chuck prosciutto. Short loin bresaola burgdoggen salami andouille capicola short ribs hamburger frankfurter pork rump kevin biltong landjaeger filet mignon.'
  }
]

function App() {
  return (
    <>
      <SideBar merchants={mockMerchants} />
      <Map />
    </>
  );
}

export default App;
