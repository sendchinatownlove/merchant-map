import { createContext, useContext, useState } from "react";
import { Merchant } from "../App";
import { mockData } from "./mockData";

type EventHandlerContextValue = {
  map: google.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
  handleSidebarScroll: (merchant: Merchant) => void;
  currentMerchant: Merchant | null;
  handleMarkerClick: (merchant: Merchant) => void;
  merchantRefs: { [key: string]: React.MutableRefObject<Element | undefined> };
};

const initialState: EventHandlerContextValue = {
  map: null,
  setMap: () => {},
  handleSidebarScroll: () => {},
  currentMerchant: null,
  handleMarkerClick: () => {},
  merchantRefs: {},
};
const EventHandlerContext = createContext(initialState);

export function EventHandlerProvider({ children }: any) {
  const merchantsData = mockData;
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentMerchant, setCurrentMerchant] = useState<Merchant | null>(
    merchantsData.length > 0 ? merchantsData[0] : null
  );
  const [clickedMerchant, setClickedMerchant] = useState<Merchant | null>(null);
  const merchantRefs: { [key: string]: any } = {};

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
    console.log(currentMerchant);
  };

  // TODO: Make function to handle assigning values to context variables
  const values: EventHandlerContextValue = {
    map,
    setMap,
    handleSidebarScroll,
    currentMerchant,
    handleMarkerClick,
    merchantRefs,
  };

  return (
    <EventHandlerContext.Provider value={values}>
      {children}
    </EventHandlerContext.Provider>
  );
}

export const useEventHandler = () => useContext(EventHandlerContext);
