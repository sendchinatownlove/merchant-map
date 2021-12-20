import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEventHandler } from "../../utilities/EventHandlerContext";
import { EventActionType } from "../../utilities/handleEventReducer";
import { LatLong, Merchant } from "../../utilities/types";
import {
  handleMapZoom,
  handleMarkerClick,
  selectMarkerIcon,
  useHandleMapEvents,
} from "./utility";
import "./Map.scss";
import ZoomButtons from "./ZoomButtons";

// Create an .env file and store your Google Maps API key as VITE_GOOGLE_MAPS_API_KEY
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const googleMapsOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
};

const defaultMapCenter: LatLong = {
  lat: 40.7160816,
  lng: -74.0012583,
};

interface MapProps {
  merchants: Merchant[];
}

export function Map({ merchants }: MapProps) {
  const { state, dispatch } = useEventHandler();

  useHandleMapEvents();

  return (
    <div className="Map-Container">
      <LoadScript googleMapsApiKey={apiKey as string}>
        <GoogleMap
          options={googleMapsOptions}
          mapContainerStyle={mapContainerStyle}
          center={merchants ? merchants[0].position : defaultMapCenter}
          zoom={17}
          onLoad={(map) =>
            dispatch({ type: EventActionType.SET_MAP, payload: { map } })
          }
        >
          <ZoomButtons
            zoomInCallback={() => handleMapZoom(state.map, "zoom-in")}
            zoomOutCallback={() => handleMapZoom(state.map, "zoom-out")}
          />
          {merchants.map((merchant) => {
            return (
              <Marker
                onClick={() =>
                  handleMarkerClick(
                    merchant,
                    merchants,
                    dispatch,
                    state.isMobile
                  )
                }
                key={merchant.name}
                position={merchant.position}
                icon={selectMarkerIcon(merchant)}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
