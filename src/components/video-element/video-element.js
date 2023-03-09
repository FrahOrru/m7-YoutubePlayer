import {
  VideoElementStyled,
  LittleVideoElementStyled,
  AddToPlaylistButton,
} from "../styled/video-element-styled";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function VideoElement({
  mode,
  video,
  isLittle,
  isChangingPage,
  onAddToPlaylistModal,
  onRemoveFromPlaylist,
}) {
  const navigate = useNavigate();

  const onVideoClicked = () => {
    isChangingPage(true);

    navigate(`/search/${video.id.videoId}`);
  };

  const videoActions = [];
  if (mode === "playlist") {
    videoActions.push({
      url: "https://img.icons8.com/material-outlined/24/FFFFFF/delete-forever.png",
      alt: "remove",
      action: () => onRemoveFromPlaylist(),
    });
  } else if (mode === "dashboard") {
    videoActions.push({
      url: "https://img.icons8.com/material-outlined/24/FFFFFF/save-search.png",
      alt: "playlist",
      action: () => onAddToPlaylistModal(),
    });
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
            {videoActions.map((videoAction) => (
              <AddToPlaylistButton
                className="glass"
                key={videoAction.alt}
                onClick={videoAction.action}
              >
                <img src={videoAction.url} alt={videoAction.alt} />
              </AddToPlaylistButton>
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
}
