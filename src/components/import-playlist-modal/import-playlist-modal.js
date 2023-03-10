import { useContext, useState } from "react";
import { ModalStyled } from "../styled/modal-styled";
import { SearchBarStyled } from "../styled/search-input";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getPlaylist } from "../../api/playlists";
import PlaylistContext from "../../context/PlaylistContext";

export default function ImportPlaylistModal({ onCloseImportedModal }) {
  const [playlistText, setPlaylistText] = useState("");
  const [importedPlaylist, setImportedPlaylist] = useState(null);

  const { playlists, setPlaylists } = useContext(PlaylistContext);

  const handlePlaylistChange = (event) => {
    setPlaylistText(event.target.value);
  };

  const { data: newPlaylist } = useQuery({
    enabled: importedPlaylist !== null,
    queryKey: ["getPlaylist"],
    queryFn: () => getPlaylist(importedPlaylist),
    onSuccess: (newPlaylistElem) => {
      setPlaylists([...playlists, newPlaylistElem]);
      setImportedPlaylist(null);
      onCloseImportedModal();
    },
  });

  const handlePlaylistImport = () => {
    setImportedPlaylist(playlistText);
  };
  return (
    <ModalStyled>
      <div style={{ display: "flex", justifyContent: "end", color: "#000" }}>
        <div className="close" onClick={() => onCloseImportedModal()}>
          &times;
        </div>
      </div>
      <div className="content">
        <h2>Import an existing Playlis</h2>
        <SearchBarStyled
          style={{ width: "90%" }}
          value={playlistText}
          onChange={handlePlaylistChange}
          className="glass input"
          type="text"
          placeholder="insert the code of the playlist"
        ></SearchBarStyled>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <button className="glass creation-btn" onClick={handlePlaylistImport}>
            Import Playlist
          </button>
        </motion.div>
      </div>
    </ModalStyled>
  );
}
