import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Circle } from "./components/circle";
import { useState } from "react";
import ControlPanel from "./control-panel";
import '@vis.gl/react-google-maps/examples.css';

function App() {
  const [center, setCenter] = useState({ lat: -6.2622533, lng: 106.7818603 });
  const [radius, setRadius] = useState(112.60305101555548);

  const changeCenter = (newCenter: google.maps.LatLng | null) => {
    console.log("🚀 ~ changeCenter ~ newCenter:", newCenter)
    if (!newCenter) return;
    setCenter({ lng: newCenter.lng(), lat: newCenter.lat() });
  };
  return (
    <>
      <APIProvider apiKey={"AIzaSyDSvOsaelc316OEqut67Vpw8VeBkYJp67U"}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: -6.2622533, lng: 106.7818603 }}
          defaultZoom={18}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
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
        </Map>
        <ControlPanel
          center={center}
          radius={radius}
          onCenterChanged={setCenter}
          onRadiusChanged={setRadius}
        />
      </APIProvider>
    </>
  );
}

export default App;
