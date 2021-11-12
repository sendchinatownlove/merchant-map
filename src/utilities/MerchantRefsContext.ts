import React, { createContext, MutableRefObject } from "react";
import { Merchant } from "../App";

export type MerchantRefsContextValue = {
  merchantRefs: { [key: string]: MutableRefObject<HTMLDivElement> };
  isMapClick: boolean;
  setIsMapClick: React.Dispatch<React.SetStateAction<boolean>>;
  map: google.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
  handleUserSidebarScroll: (
    isCardOnScreen: boolean,
    merchant: Merchant
  ) => void;
};

const contextValues: MerchantRefsContextValue = {
  merchantRefs: {},
  isMapClick: false,
  setIsMapClick: () => {},
  map: null,
  setMap: () => {},
  handleUserSidebarScroll: () => {},
};

export const MerchantRefsContext = createContext(contextValues);
