import { useContext } from "react";
import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api";
import { Merchant } from "../App";
import { MerchantRefsContext } from "../utilities/MerchantRefsContext";

// Create an .env file and store your Google Maps API key as VITE_GOOGLE_MAPS_API_KEY
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

export type LatLong = {
  lat: number;
  lng: number;
};

const defaultMapCenter: LatLong = {
  lat: 40.7160816,
  lng: -74.0012583,
};

interface MapProps {
  merchants: Merchant[];
  currentMerchant: Merchant | null;
  handleMarkerClick: (merchant: Merchant) => void;
}

const selectedMarkerIcon =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

const unselectedMarkericon = "";

export function Map({
  merchants,
  currentMerchant,
  handleMarkerClick,
}: MapProps) {
  const { setMap } = useContext(MerchantRefsContext);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={merchants ? merchants[0].position : defaultMapCenter}
        zoom={14}
        onLoad={(map) => {
          setMap(map);
        }}
      >
        {merchants.map((merchant) => {
          return (
            <Marker
              onClick={() => handleMarkerClick(merchant)}
              key={merchant.name}
              position={merchant.position}
              icon={
                currentMerchant && merchant.name === currentMerchant.name
                  ? selectedMarkerIcon
                  : unselectedMarkericon
              }
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}
