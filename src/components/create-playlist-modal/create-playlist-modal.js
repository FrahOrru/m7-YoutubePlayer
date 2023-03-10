import "./create-playlist-modal.css";
import { useState } from "react";
import { SearchBarStyled } from "../styled/search-input";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "react-query";
import { addPlaylist } from "../../api/playlists";
import { ModalStyled } from "../styled/modal-styled";

export default function Modal({ onClose, onNewPlaylist }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePlaylistCreation = () => {
    mutate(searchText);
  };

  const queryClient = useQueryClient();

  const { status, error, mutate } = useMutation({
    mutationFn: addPlaylist,
    onSuccess: (newPlaylist) => {
      queryClient.setQueryData(["playlists", newPlaylist.id], {
        id: newPlaylist.id,
        name: searchText,
      });
      onNewPlaylist(newPlaylist.id);
    },
  });

  return (
    <ModalStyled>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <div className="close" onClick={() => onClose()}>
          &times;
        </div>
      </div>

      <div className="content">
        <h2>Create a New Playlis</h2>
        <SearchBarStyled
          style={{ width: "90%" }}
          value={searchText}
          onChange={handleSearchChange}
          className="glass input"
          type="text"
          placeholder="insert the name of the playlist"
        ></SearchBarStyled>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <button
            className="glass creation-btn"
            onClick={handlePlaylistCreation}
          >
            Create
          </button>
        </motion.div>
      </div>
    </ModalStyled>
  );
}
