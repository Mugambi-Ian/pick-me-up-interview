import { useEffect, useState } from "react";
import Dashboard from "./components/dashboard/dashboard";
import Splash from "./components/splash/splash";
import Lottie from "react-lottie";

const App: React.FC = () => {
  const [activeSplash, setSplashStatus] = useState(true);
  const [locationEnabled, updateLocationPerm] = useState<boolean>(false);

  useEffect(() => {
    loadPermisson();
  });

  async function loadPermisson() {
    let e = "geolocation" in navigator;
    const res = await navigator.permissions.query({ name: "geolocation" });
    res.addEventListener("change", (ev) => {
      const res: any = ev.target;
      if (res?.state !== "denied") {
        updateLocationPerm(true);
      } else {
        updateLocationPerm(false);
      }
    });
    if (e && res.state !== "denied") {
      updateLocationPerm(true);
    }
  }

  return (
    <>
      {activeSplash ? (
        <Splash
          closeSplash={() => {
            setSplashStatus(false);
          }}
        />
      ) : locationEnabled ? (
        <Dashboard />
      ) : (
        <div className="no-perm">
          <div className="anim">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: require("./assets/animations/mov-map.json"),
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              isClickToPauseDisabled={true}
            />
          </div>
          <p>Allow site to access your location to proceed</p>
        </div>
      )}
    </>
  );
};

export default App;
