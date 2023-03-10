import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaylist, removeFromPlaylist } from "../../api/playlists";
import VideoElement from "../video-element/video-element";
import "./playlist-detail.css";

export default function PlaylistDetail({ Playlist, onClosure }) {
  const [enableRemoval, setEnableRemoval] = useState(null);
  const { playlistId } = useParams();

  const navigate = useNavigate();

  const { data: playlist } = useQuery({
    enabled: playlistId !== null,
    queryKey: ["getPlaylist"],
    queryFn: () => getPlaylist(playlistId),
  });

  const { data } = useQuery({
    enabled: enableRemoval !== null,
    queryKey: ["removeFromPlaylist"],
    queryFn: () => removeFromPlaylist(enableRemoval, playlistId),
    onSuccess: () => {
      setEnableRemoval(null);
    },
  });

  const onRemoveFromPlaylist = (video) => {
    const modifiedPlaylist = playlist;
    modifiedPlaylist.videos = playlist.videos.filter(
      (vid) => vid.id.videoId !== video.id.videoId
    );
    setEnableRemoval(modifiedPlaylist);
  };

  const backToHome = () => {
    navigate("/", { state: { value: "fromPlaylist" } });
  };

  return (
    <div className="glass Dashboard playlist-detail">
      <div className="backtoHome">
        <img
          src="https://img.icons8.com/material-outlined/24/FFFFFF/left.png"
          alt="back"
          onClick={() => backToHome()}
        />
      </div>
      <div className="videos">
        {playlist.videos.map((video) => (
          <VideoElement
            mode="playlist"
            isChangingPage={() => {}}
            playlistVideos={playlist.videos}
            key={video.id.videoId}
            video={video}
            onRemoveFromPlaylist={() => onRemoveFromPlaylist(video)}
          ></VideoElement>
        ))}
      </div>
    </div>
  );
}
