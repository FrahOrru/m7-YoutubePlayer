import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPlaylist, removePlaylist } from "../../api/playlists";
import { ModalBigStyled } from "../styled/modal-styled";
import { SearchBarStyled } from "../styled/search-input";
import VideoElement from "../video-element/video-element";
import "./playlist-detail.css";

export default function PlaylistDetail({ Playlist, onClosure }) {
  const [searchText, setSearchText] = useState("");
  const [enableRemoval, setEnableRemoval] = useState(null);
  const { playlistId } = useParams();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const { data: playlist } = useQuery({
    enabled: playlistId !== null,
    queryKey: ["getPlaylist"],
    queryFn: () => getPlaylist(playlistId),
  });

  const { data } = useQuery({
    enabled: enableRemoval !== null,
    queryKey: ["removeFromPlaylist"],
    queryFn: () => removePlaylist(enableRemoval, playlistId),
    onSuccess: () => {
      setEnableRemoval(null);
    },
  });

  const onRemoveFromPlaylist = (video) => {
    const modifiedPlaylist = playlist;
    modifiedPlaylist.videos = playlist.videos.filter(
      (video) => video.id.videoId !== video.id.videoId
    );
    setEnableRemoval(modifiedPlaylist);
  };

  return (
    <div className="glass Dashboard playlist-detail">
      <SearchBarStyled
        value={searchText}
        onChange={handleSearchChange}
        className="glass"
        type="text"
        placeholder="Search in your playlist.."
      ></SearchBarStyled>
      <div className="videos">
        {playlist.videos.map((video) => (
          <VideoElement
            mode="playlist"
            isChangingPage={() => {}}
            key={video.id.videoId}
            video={video}
            onRemoveFromPlaylist={() => onRemoveFromPlaylist(video)}
          ></VideoElement>
        ))}
      </div>
    </div>
  );
}
