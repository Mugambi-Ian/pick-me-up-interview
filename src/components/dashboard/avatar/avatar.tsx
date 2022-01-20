import React from "react";
import { useState } from "react";
import "./avatar.css";

const Avatar: React.FC<{
  lat: number;
  lng: number;
}> = (props) => {
  const [displayDetails, updateDisplayDetails] = useState<boolean>(false);
  return (
    <div className="avatar">
      <button
        onClick={async () =>
          await setTimeout(() => {
            updateDisplayDetails(true);
          }, 300)
        }
      >
        <img
          alt="marker"
          src={require("../../../assets/drawables/ic-avatar.png")}
        />
      </button>
      <div className="details" id={displayDetails ? "visible" : ""}>
        <header>
          <h1>Current Location</h1>
          <button
            onClick={async () =>
              await setTimeout(() => {
                updateDisplayDetails(false);
              }, 300)
            }
          >
            <img
              src={require("../../../assets/drawables/ic-close.png")}
              alt="close-details"
            />
          </button>
        </header>
        <p>Latitude:{props.lat}</p>
        <p>Longitude: {props.lng}</p>
      </div>
    </div>
  );
};

export default Avatar;
