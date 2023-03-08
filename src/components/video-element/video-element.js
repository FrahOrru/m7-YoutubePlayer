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
  video,
  isLittle,
  isChangingPage,
  onAddToPlaylistModal,
}) {
  const navigate = useNavigate();

  const onVideoClicked = () => {
    isChangingPage(true);

    navigate(`/search/${video.id.videoId}`);
  };

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
            <AddToPlaylistButton
              className="glass"
              key={video.id.videoId}
              onClick={() => onAddToPlaylistModal(video.id.videoId)}
            >
              <img src="https://img.icons8.com/material-outlined/24/FFFFFF/save-search.png" />
            </AddToPlaylistButton>
          </motion.div>
        </div>
      )}
    </>
  );
}
