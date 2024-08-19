import {
  APIProvider,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import {
  PlaceReviews,
  PlaceDataProvider,
  PlaceDirectionsButton,
  IconButton,
  PlaceOverview,
  SplitLayout,
  OverlayLayout,
  PlacePicker,
} from "@googlemaps/extended-component-library/react";
import { OverlayLayout as TOverlayLayout } from "@googlemaps/extended-component-library/overlay_layout.js";
import { PlacePicker as TPlacePicker } from "@googlemaps/extended-component-library/place_picker.js";
import { Circle } from "./components/circle";
import { useRef, useState } from "react";
import ControlPanel from "./control-panel";
import "./app.css";
import "@vis.gl/react-google-maps/examples.css";


const DEFAULT_ZOOM = 17;
const DEFAULT_ZOOM_WITH_LOCATION = 20;

function App2nd() {
  const [center, setCenter] = useState({ lat: -6.2622533, lng: 106.7818603 });
  const [radius, setRadius] = useState(200);

  const overlayLayoutRef = useRef<TOverlayLayout>(null);
  const pickerRef = useRef<TPlacePicker>(null);
  const [college, setCollege] = useState<google.maps.places.Place | undefined>(
    undefined
  );

  const changeCenter = (newCenter: google.maps.LatLng | null) => {
    console.log("🚀 ~ changeCenter ~ newCenter:", newCenter);
    if (!newCenter) return;
    setCenter({ lng: newCenter.lng(), lat: newCenter.lat() });
  };

  return (
    <>
      <APIProvider apiKey={"AIzaSyDSvOsaelc316OEqut67Vpw8VeBkYJp67U"}>
        <SplitLayout rowReverse rowLayoutMinWidth={700}>
        <div className="SplitLayoutContainer" slot="main">
            <Map
              style={{ width: "100vw", height: "100vh" }}
              id="gmap"
              mapId="8c732c82e4ec29d9"
              center={college?.location ?? center}
              zoom={
                college?.location ? DEFAULT_ZOOM_WITH_LOCATION : DEFAULT_ZOOM
              }
              disableDefaultUI
              gestureHandling={"greedy"}
              // zoomControl={false}
            >
              <Marker
                position={center}
                draggable
                onDrag={(e) =>
                  setCenter({
                    lat: e.latLng?.lat() ?? 0,
                    lng: e.latLng?.lng() ?? 0,
                  })
                }
              />
              <Circle
                radius={radius}
                center={center}
                onRadiusChanged={setRadius}
                onCenterChanged={changeCenter}
                strokeColor={"#0c4cb3"}
                strokeOpacity={1}
                strokeWeight={3}
                fillColor={"#3b82f6"}
                fillOpacity={0.3}
                editable
                draggable
              />
              {/* <ControlPanel /> */}
              <ControlPanel
                center={center}
                radius={radius}
                onCenterChanged={setCenter}
                onRadiusChanged={setRadius}
              />
            </Map>
          </div>
          
          <div className="SplitLayoutContainer" slot="fixed">
            <OverlayLayout ref={overlayLayoutRef}>
              <div className="MainContainer" slot="main">
                <PlacePicker
                  className="CollegePicker"
                  ref={pickerRef}
                  forMap="gmap"
                  country={["id"]}
                  type="university"
                  placeholder="Enter a college in the ID or Jakarta"
                  onPlaceChange={() => {
                    if (!pickerRef.current?.value) {
                      setCollege(undefined);
                    } else {
                      setCollege(pickerRef.current?.value);
                    }
                  }}
                />
                <PlaceOverview
                  size="large"
                  place={college}
                  googleLogoAlreadyDisplayed
                >
                  <div slot="action">
                    <IconButton
                      slot="action"
                      variant="filled"
                      onClick={() => overlayLayoutRef.current?.showOverlay()}
                    >
                      See Reviews
                    </IconButton>
                  </div>
                  <div slot="action">
                    <PlaceDirectionsButton slot="action" variant="filled">
                      Directions
                    </PlaceDirectionsButton>
                  </div>
                </PlaceOverview>
              </div>
              <div slot="overlay">
                <IconButton
                  className="CloseButton"
                  onClick={() => overlayLayoutRef.current?.hideOverlay()}
                >
                  Close
                </IconButton>
                <PlaceDataProvider place={college}>
                  <PlaceReviews />
                </PlaceDataProvider>
              </div>
            </OverlayLayout>
          </div>
        </SplitLayout>
      </APIProvider>
    </>
  );
}

export default App2nd;
