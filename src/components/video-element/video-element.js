import {
  VideoElementStyled,
  LittleVideoElementStyled,
  AddToPlaylistButton,
} from "./video-element-styled";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddToPlaylistModal from "../add-to-playlist-modal/add-to-playlist-modal";

export default function VideoElement({
  mode,
  video,
  isLittle,
  isChangingPage,
  onAddToPlaylistModal,
  onRemoveFromPlaylist,
}) {
  const [videoActions, setVideoActions] = useState([]);
  const navigate = useNavigate();

  const onVideoClicked = () => {
    isChangingPage(true);

    navigate(`/search/${video.id.videoId}`);
  };

  if (mode === "playlist") {
    setVideoActions([
      ...videoActions,
      {
        url: "https://img.icons8.com/material-outlined/24/000000/delete-forever.png",
        alt: "remove",
        action: () => onRemoveFromPlaylist(),
      },
    ]);
  } else {
    setVideoActions([
      ...videoActions,
      {
        url: "https://img.icons8.com/material-outlined/24/FFFFFF/save-search.png",
        alt: "playlist",
        action: () => onAddToPlaylistModal(),
      },
    ]);
  }

  return (
    <>
      {isLittle ? (
        <LittleVideoElementStyled onClick={onVideoClicked}>
          <img src={video.snippet.thumbnails.url} alt="videoImage"></img>
          <div>
            <h3>{video.title}</h3>
            <h4>{video.channelName}</h4>
          </div>
        </LittleVideoElementStyled>
      ) : (
        <div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.9 }}>
            <VideoElementStyled
              className="video-element"
              onClick={onVideoClicked}
            >
              <img src={video.snippet.thumbnails.url} alt="videoImage"></img>
              <h3>{video.title}</h3>
              <h4>{video.channelName}</h4>
            </VideoElementStyled>
          </motion.div>
          <motion.div whileTap={{ scale: 0.9 }}>
            {videoActions.map((action) => (
              <AddToPlaylistButton
                className="glass"
                key={action.alt}
                onClick={action.action}
              >
                <img src={action.url} alt={action.alt} />
              </AddToPlaylistButton>
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
}
