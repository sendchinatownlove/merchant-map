import { useEffect, useState } from "react";
import { Merchant } from "../types";
import { MERCHANTS_ENDPOINT } from "./endpoints";

type FetchResult = {
  data: Merchant[];
  loading: boolean;
  error: boolean;
};

export function useFetchMerchants(): FetchResult {
  const [fetchedData, setData] = useState<FetchResult>({
    data: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    fetch(MERCHANTS_ENDPOINT)
      .then((res) => res.text())
      .then((res) => {
        const jsonResponse: Merchant[] = JSON.parse(res);
        setData({ ...fetchedData, loading: false, data: jsonResponse });
      })
      .catch(() => {
        setData({ ...fetchedData, error: true });
      });
  }, []);

  return fetchedData;
}
