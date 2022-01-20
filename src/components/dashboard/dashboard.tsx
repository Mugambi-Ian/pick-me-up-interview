import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { API_KEY, MAP_DEFAULT } from "../../assets/env/config";
import Avatar from "./avatar/avatar";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  const [findMe, updateFindStatus] = useState<boolean>(false);
  const [zoomLevel, updateZoomLevel] = useState<number>(3);
  const [coords, updateCoords] = useState<{
    lat: number;
    lng: number;
  }>(MAP_DEFAULT);

  useEffect(() => {
    if (findMe) {
      const interval = setInterval(() => {
        refreshPosition();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [findMe]);

  const refreshPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude,
        lng = position.coords.longitude;
      updateCoords({ lat, lng });
    });
  };

  return (
    <div className="dashboard">
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        center={coords}
        zoom={zoomLevel}
      >
        {findMe && coords.lat !== 0 ? (
          <Avatar lat={coords.lat} lng={coords.lng} />
        ) : (
          <></>
        )}
      </GoogleMapReact>
      <button
        id="find-me"
        onClick={async () => {
          await setTimeout(() => {
            if (findMe) {
              updateZoomLevel(3);
              updateCoords(MAP_DEFAULT);
            } else {
              updateZoomLevel(16);
            }
            updateFindStatus(!findMe);
          }, 300);
        }}
      >
        <img
          src={
            !findMe
              ? require("../../assets/drawables/ic-pin.png")
              : require("../../assets/drawables/ic-cross.png")
          }
          alt="find-me"
        />
        <label>{!findMe ? "Find Me" : "Stop Tracking"}</label>
      </button>
    </div>
  );
};

export default Dashboard;
