import { useState, useEffect } from "react";
import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api";

// Create an .env file and store your Google Maps API key as VITE_GOOGLE_MAPS_API_KEY
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapContainerStyle = {
  width: "400px",
  height: "400px",
};

// Sample payload. Lat-long coordinates are required for the Google maps API
const merchants = [
  { name: "Store 1", position: { lat: 40.665708, lng: -73.982378 } },
  {
    name: "Store 2",
    position: { lat: 40.6586321, lng: -73.9843882 },
  },
  { name: "Store 3", position: { lat: 40.7109997, lng: -73.9670851 } },
  { name: "Store 4", position: { lat: 40.7278856, lng: -73.9592555 } },
  { name: "Store 5", position: { lat: 40.624164, lng: -74.0331407 } },
  { name: "Store 6", position: { lat: 40.6608971, lng: -73.955495 } },
];

function Map() {
  const [mapCenter, setMapCenter] = useState(merchants[0].position);
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
        center={merchants[0].position}
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

export default Map;
