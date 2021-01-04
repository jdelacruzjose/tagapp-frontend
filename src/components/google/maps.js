import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

export default function theMap(props) {
  const latitude = props.theEvent.lat;
  const longitude = props.theEvent.lng;

  console.log(`The lat: ${latitude} and the lng: ${longitude}`);

  function Map() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: latitude, lng: longitude }}
      >
        <Marker
          position ={{
            lat: latitude,
            lng: longitude
          }}
        />
      </GoogleMap>
    );
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
    <div style={{ width: `100vw`, height: `100vh` }}>
      <WrappedMap
        googleMapURL={`${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
