import { useEffect, useState } from "react";
import { Merchant, MerchantRaw } from "../types";
import { MERCHANTS_ENDPOINT } from "./endpoints";
import { MerchantInfo } from "../../data/merchant_info";
import { getAddressFromGeocache, getLatLongFromGeocache } from "../geocache";

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
    // const response = await fetch(MERCHANTS_ENDPOINT);
    const jsonResponse = MerchantInfo;
    const fullData = transformJson(jsonResponse);
    try {
      // const responseText = await response.text();
      // const jsonResponse = JSON.parse(responseText);
      setData({ ...fetchedData, loading: false, data: fullData });
    } catch (e: any) {
      setData({ ...fetchedData, loading: false, error: e.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return fetchedData;
}

// taken from https://github.com/sendchinatownlove/fast/blob/cf9caad87efb0141c90e48ba7adb28ef287d3b2a/website/app.js#L11
function transformJson(rawData: MerchantRaw[]): Merchant[] {
    let output: Merchant[] = [];
    rawData.forEach((m) => {
        let trimmedCache = m.RoboGeocache.substring(2);
        console.log(trimmedCache);
        console.log(getLatLongFromGeocache(trimmedCache));
        let newMerch = {
            name: m.Name,
            address: getAddressFromGeocache(trimmedCache),
            shortDescription: m["Short Description"],
            heroURL: m["Hero Image URL"],
            phoneNumber: m.Phone,
            websiteUrl: m.Website,
            story: m.Story,
            type: m.TYPE,
            position: getLatLongFromGeocache(trimmedCache),
        };

        if (m.Name && newMerch.position.lat != undefined && m.RoboGeocache && m["Hide on Map"] != "checked") {
            output.push(newMerch);
        }
    });
    return output;
}