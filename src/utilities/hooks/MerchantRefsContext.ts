import React, { useState, createContext, MutableRefObject  } from "react";


export type MerchantRefsContextValue = {
  merchantRefs : {[key:string]: MutableRefObject<HTMLDivElement>},
  isMapClick: boolean,
  setIsMapClick: React.Dispatch<React.SetStateAction<boolean>>,
  map: any,
  setMap: any
}

const contextValues: MerchantRefsContextValue = {
  merchantRefs: {},
  isMapClick: false, 
  setIsMapClick: ()=>{},
  map: null,
  setMap: ()=>{}
};

export const MerchantRefsContext = createContext(contextValues);