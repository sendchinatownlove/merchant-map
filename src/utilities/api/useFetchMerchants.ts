import { useEffect, useState } from "react";
import { Merchant } from "../types";
import { MERCHANTS_ENDPOINT } from "./endpoints";

function handleError(response: Response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export function useFetchMerchants() {
  const [data, setData] = useState<Merchant[]>([]);

  useEffect(() => {
    fetch(MERCHANTS_ENDPOINT)
      .then(handleError)
      .then((res) => res.text())
      .then((res) => {
        const jsonResponse: Merchant[] = JSON.parse(res);
        if (jsonResponse.length > 0) {
          setData(jsonResponse);
        }
      });
  }, []);
  return data;
}
