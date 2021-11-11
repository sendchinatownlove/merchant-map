import { useState, useEffect } from "react";
import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api";
import { Merchant } from "../App";

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
  setCurrentMerchant: React.Dispatch<React.SetStateAction<Merchant | null>>;
}

const selectedMarkerIcon =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

const unselectedMarkericon = "";

export function Map({
  merchants,
  currentMerchant,
  setCurrentMerchant,
}: MapProps) {
  const [mapCenter, setMapCenter] = useState(
    merchants.length > 0 ? merchants[0].position : defaultMapCenter
  );
  const [mapObject, setMapObject] = useState<google.maps.Map | null>(null);

  // Force render so that the map pans
  useEffect(() => {
    if (mapObject) {
      mapObject.panTo(mapCenter);
    }
  }, [mapCenter]);

  // Update map center whenever currentMerchant is updated
  useEffect(() => {
    if (currentMerchant) {
      setMapCenter(currentMerchant.position);
    }
  }, [currentMerchant]);

  const handleMarkerClick = (e: any, merchant: Merchant) => {
    setMapCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setCurrentMerchant(merchant);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={14}
        onLoad={(map) => {
          setMapObject(map);
        }}
      >
        {merchants.map((merchant) => (
          <Marker
            onClick={(e) => handleMarkerClick(e, merchant)}
            key={merchant.name}
            position={merchant.position}
            icon={
              currentMerchant && merchant.name === currentMerchant.name
                ? selectedMarkerIcon
                : unselectedMarkericon
            }
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
