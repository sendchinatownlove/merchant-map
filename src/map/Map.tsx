import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import { useEventHandler } from "../utilities/EventHandlerContext";
import { EventAction, EventActionType } from "../utilities/handleEventReducer";
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

function handleMarkerClick(
  merchant: Merchant,
  dispatch: React.Dispatch<EventAction>
): void {
  dispatch({
    type: EventActionType.MARKER_CLICK,
    payload: { merchant },
  });
}

function selectMarkerIcon(merchant: Merchant) {
  const { state } = useEventHandler();

  if (state.markedMerchant && merchant.name === state.markedMerchant.name) {
    return selectedMarkerIcon;
  }
  return unselectedMarkericon;
}

//  Hook that handles map panning
function usehandleMapEvents() {
  const { state } = useEventHandler();

  // Pan the map to the markedMerchant if markedMerchant is updated
  useEffect(() => {
    if (state.markedMerchant) {
      state.map?.panTo(state.markedMerchant.position);
    }
  }, [state.markedMerchant]);

  // Pan the map to the clickedMerchant if clickedMerchant is updated
  useEffect(() => {
    if (state.clickedMerchant) {
      state.map?.panTo(state.clickedMerchant?.position);
    }
  }, [state.clickedMerchant]);
}

export function Map({ merchants }: MapProps) {
  const { dispatch } = useEventHandler();

  usehandleMapEvents();

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={merchants ? merchants[0].position : defaultMapCenter}
        zoom={14}
        onLoad={(map) =>
          dispatch({ type: EventActionType.SET_MAP, payload: { map } })
        }
      >
        {merchants.map((merchant) => {
          return (
            <Marker
              onClick={() => handleMarkerClick(merchant, dispatch)}
              key={merchant.name}
              position={merchant.position}
              icon={selectMarkerIcon(merchant)}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}
