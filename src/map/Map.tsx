import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api";

import { useEventHandler } from "../utilities/EventHandlerContext";
import { EventActionType } from "../utilities/handleEventReducer";
import { LatLong, Merchant } from "../utilities/types";

// Create an .env file and store your Google Maps API key as VITE_GOOGLE_MAPS_API_KEY
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultMapCenter: LatLong = {
  lat: 40.7160816,
  lng: -74.0012583,
};

interface MapProps {
  merchants: Merchant[];
}

const selectedMarkerIcon =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

const unselectedMarkericon = "";

export function Map({ merchants }: MapProps) {
  const { state, dispatch } = useEventHandler();

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={merchants ? merchants[0].position : defaultMapCenter}
        zoom={14}
        onLoad={(map) => {
          dispatch({ type: EventActionType.SET_MAP, payload: { map } });
        }}
      >
        {merchants.map((merchant) => {
          return (
            <Marker
              onClick={() => {
                dispatch({
                  type: EventActionType.MARKER_CLICK,
                  payload: { merchant },
                });
              }}
              key={merchant.name}
              position={merchant.position}
              icon={
                state.markedMerchant &&
                merchant.name === state.markedMerchant.name
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
