import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import PartyDashboard from "./components/party-dashboard/party-dashboard";
import PlaylistDashboard from "./components/playlist-dashboard/playlist-dashboard";
import SideBar from "./components/sideBar/sideBar";
import { useSelector, useDispatch } from "react-redux";
import PlaylistContext from "./context/PlaylistContext";
import { useLocation } from "react-router-dom";

function App() {
  const [dashboardName, setDashboardName] = useState("");
  const [dashboard, setDashboard] = useState(<Dashboard />);

  const [playlists, setPlaylists] = useState([]);

  const onElementClicked = (element) => {
    setDashboardName(element);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setDashboardName("Playlists");
    }
  }, [location]);

  useEffect(() => {
    switch (dashboardName) {
      case "Home":
      case "":
        return setDashboard(<Dashboard />);
      case "Playlists":
      case "fromPlaylist":
        return setDashboard(<PlaylistDashboard />);
      case "Party Mode":
        return setDashboard(<PartyDashboard />);
      default:
        return setDashboard(<Dashboard />);
    }
  }, [dashboardName]);

  return (
    <>
      <PlaylistContext.Provider value={{ playlists, setPlaylists }}>
        <div className="App">
          <div className="left-elem glass">
            <SideBar onElementClicked={onElementClicked}></SideBar>
          </div>
          <div className="rigth-elem glass">{dashboard}</div>
        </div>
      </PlaylistContext.Provider>
    </>
  );
}

export default App;
