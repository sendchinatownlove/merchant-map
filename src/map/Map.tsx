import { useState, useEffect } from "react";
import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api";
import { Merchant } from "../App";

// Create an .env file and store your Google Maps API key as VITE_GOOGLE_MAPS_API_KEY
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapContainerStyle = {
  width: "400px",
  height: "400px",
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
}

export function Map({ merchants }: MapProps) {
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

  const handleMarkerClick = (e: any) => {
    setMapCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={12}
        onLoad={(map) => {
          setMapObject(map);
        }}
      >
        {merchants.map((merchant) => (
          <Marker
            onClick={handleMarkerClick}
            key={merchant.name}
            position={merchant.position}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
