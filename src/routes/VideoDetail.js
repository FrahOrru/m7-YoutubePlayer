import { useState } from "react";
import { SearchBarStyled } from "../components/styled/search-input";
import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../components/video-player/video-player";
import VideoList from "../components/video-list/video-list";
import LoadingMotion from "../components/loading-motion/loading-motion";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function VideoDetail() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const { videoId } = useParams();
  const [isChanging, setIsChanging] = useState(false);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const { data, error } = useSWR(
    `https://youtube.thorsteinsson.is/api/videos/${videoId}`,
    fetcher,
    {
      revalidateOnMount: true,
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      shouldRetryOnError: false,
    }
  );

  const reload = () => {
    setIsChanging(true);
    setTimeout(() => {
      setIsChanging(false);
    }, 1000);
  };

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="glass video-detail">
      <div className="backtoHome">
        <img
          src="https://img.icons8.com/material-outlined/24/FFFFFF/left.png"
          alt="back"
          onClick={backToHome}
        />
      </div>
      <div className="searchBar">
        <SearchBarStyled
          value={searchText}
          onChange={handleSearchChange}
          className="glass"
          type="text"
          placeholder="Search.."
        ></SearchBarStyled>
      </div>
      {isChanging ? (
        <div className="center">
          <LoadingMotion />
        </div>
      ) : (
        <div className="video-player">
          <VideoPlayer videoId={videoId}></VideoPlayer>
          <div className="video-description">
            <h2>{data?.title}</h2>
            <h3>{data?.owner}</h3>
          </div>
          <div className="video-right">
            <VideoList
              isChangingPage={reload}
              research={searchText}
            ></VideoList>
          </div>
        </div>
      )}
    </div>
  );
}
