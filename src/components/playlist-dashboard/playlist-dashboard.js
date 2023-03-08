import "./playlist-dashboard.css";
import { useContext, useEffect, useState } from "react";
import { SearchBarStyled } from "../styled/search-input";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../create-playlist-modal/create-playlist-modal";
import { CardStyled } from "../styled/card-styled";
import axios from "axios";
import { useQuery } from "react-query";
import { getPlaylist } from "../../api/playlists";
import PlaylistContext from "../../context/PlaylistContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PlaylistDashboard() {
  const [searchText, setSearchText] = useState("");
  const [newPlaylistId, setNewPlaylistId] = useState(null);

  const { playlists, setPlaylists } = useContext(PlaylistContext);

  const [boardCss, setBoardCss] = useState({
    width: "99%",
    height: "90vh",
    display: "flex",
    paddingLeft: "5%",
    paddingTop: "2rem",
  });

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (playlists.length <= 0) {
      setBoardCss({
        ...boardCss,
        justifyContent: "center",
        alignItems: "center",
      });
    } else {
      setBoardCss({
        ...boardCss,
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "2rem",
      });
    }
  }, [playlists]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
    document.getElementById("creation-card").style.display = "none";
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      document.getElementById("creation-card").style.display = "flex";
    }, 400);
  };

  const onNewPlaylist = (data) => {
    setNewPlaylistId(data);
    handleModalClose();
  };

  const { data: newPlaylist } = useQuery({
    enabled: newPlaylistId !== null,
    queryKey: ["getPlaylist"],
    queryFn: () => getPlaylist(newPlaylistId),
    onSuccess: (newPlaylistElem) => {
      setPlaylists([...playlists, newPlaylistElem]);
      setNewPlaylistId(null);
    },
  });

  return (
    <div className="Dashboard">
      <SearchBarStyled
        value={searchText}
        onChange={handleSearchChange}
        className="glass"
        type="text"
        placeholder="Search in your playlist.."
      ></SearchBarStyled>
      <div style={boardCss}>
        <motion.div
          onClick={handleCardClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isModalOpen ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <CardStyled className="glass" key="creation" id="creation-card">
            <div className="glass icon">
              <img
                src="https://img.icons8.com/material-outlined/24/FFFFFF/plus-math--v1.png"
                alt="plus"
              />
            </div>
            <div>
              <p>Create a new Playlist</p>
            </div>
          </CardStyled>
        </motion.div>

        {playlists?.map((playlist) => (
          <CardStyled key={playlist?.name} className="glass">
            {playlist & (playlist?.videos?.length > 0) ? (
              <img src={playlist.videos[0]?.thumbnailUrl} alt="plus" />
            ) : (
              <div></div>
            )}
            <div>
              <p>{playlist?.name}</p>
            </div>
          </CardStyled>
        ))}

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Modal
                onClose={handleModalClose}
                onNewPlaylist={onNewPlaylist}
              ></Modal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
