import React, { createContext, MutableRefObject  } from "react";


export type MerchantRefsContextValue = {
  merchantRefs : {[key:string]: MutableRefObject<HTMLDivElement>}
}

const contextValues: MerchantRefsContextValue = {
  merchantRefs: {},
};

export const MerchantRefsContext = createContext(contextValues);