import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPlaylist } from "../../api/playlists";
import { ModalBigStyled } from "../styled/modal-styled";
import { SearchBarStyled } from "../styled/search-input";
import VideoElement from "../video-element/video-element";
import "./playlist-detail.css";

export default function PlaylistDetail({ Playlist, onClosure }) {
  const [searchText, setSearchText] = useState("");
  const { playlistId } = useParams();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const { data: playlist } = useQuery({
    enabled: playlistId !== null,
    queryKey: ["getPlaylist"],
    queryFn: () => getPlaylist(playlistId),
  });

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
        {playlist.videos.map((video) => {
          <VideoElement
            mode="playlist"
            isChangingPage={() => {}}
            key={video.id.videoId}
            video={video}
          ></VideoElement>;
        })}
      </div>
    </div>
  );
}
