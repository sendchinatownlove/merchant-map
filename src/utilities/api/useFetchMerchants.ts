import { useEffect, useState } from "react";
import { Merchant } from "../types";
import { MERCHANTS_ENDPOINT } from "./endpoints";

type FetchResult = {
  data: Merchant[];
  loading: boolean;
  error: string | null;
};

export function useFetchMerchants(): FetchResult {
  const [fetchedData, setData] = useState<FetchResult>({
    data: [],
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    const response = await fetch(MERCHANTS_ENDPOINT);
    try {
      const responseText = await response.text();
      const jsonResponse = JSON.parse(responseText);
      setData({ ...fetchedData, loading: false, data: jsonResponse });
    } catch (e: any) {
      setData({ ...fetchedData, loading: false, error: e.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return fetchedData;
}
