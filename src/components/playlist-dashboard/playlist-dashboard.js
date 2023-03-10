import { useContext, useEffect, useState } from "react";
import { SearchBarStyled } from "../styled/search-input";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../create-playlist-modal/create-playlist-modal";
import { useQuery } from "react-query";
import { getPlaylist, removePlaylist } from "../../api/playlists";
import PlaylistContext from "../../context/PlaylistContext";
import { useNavigate } from "react-router-dom";
import PlaylistCard from "../playlist-card/playlist-card";
import ImportPlaylistModal from "../import-playlist-modal/import-playlist-modal";

export default function PlaylistDashboard() {
  const [newPlaylistId, setNewPlaylistId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [removedPlaylist, setRemovedPlaylist] = useState(null);

  const { playlists, setPlaylists } = useContext(PlaylistContext);
  console.log(playlists);
  const navigate = useNavigate();

  const [boardCss, setBoardCss] = useState({
    width: "99%",
    height: "90vh",
    display: "flex",
    paddingLeft: "5%",
    paddingTop: "2rem",
    gap: "2rem",
  });

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
      });
    }
  }, [playlists]);

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

  const { data } = useQuery({
    enabled: removedPlaylist !== null,
    queryKey: ["removePlaylist"],
    queryFn: () => removePlaylist(removedPlaylist),
    onSuccess: () => {
      setPlaylists(playlists.filter((play) => play.id !== removedPlaylist));
      setRemovedPlaylist(null);
    },
  });

  const onSharePlaylist = (playlistId) => {
    navigator.clipboard.writeText(playlistId);
  };

  const onDeletePlaylist = (playlist) => {
    setRemovedPlaylist(playlist);
  };

  const onHandleOpenImportPlaylist = () => {
    setIsImportModalOpen(true);
  };

  const onCloseImportedModal = () => {
    setIsImportModalOpen(false);
  };

  return (
    <div className="Dashboard">
      <div style={boardCss}>
        <motion.div
          onClick={handleCardClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isModalOpen ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div id="creation-card">
            <PlaylistCard
              key="creation"
              mode="create"
              text="Create a new Playlist"
            ></PlaylistCard>
          </div>
        </motion.div>

        <motion.div
          onClick={onHandleOpenImportPlaylist}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isModalOpen ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div id="import-card">
            <PlaylistCard
              key="import"
              mode="import"
              text="Import a playlist"
            ></PlaylistCard>
          </div>
        </motion.div>

        {playlists?.map((playlist) => (
          <PlaylistCard
            key={playlist?.name}
            mode="playlist"
            text={playlist?.name}
            onSharePlaylist={() => onSharePlaylist(playlist.id)}
            onOpenPlaylist={() => navigate(`/playlist/${playlist.id}`)}
            onDeletePlaylist={() => onDeletePlaylist(playlist.id)}
          ></PlaylistCard>
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
          {isImportModalOpen ? (
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
              <ImportPlaylistModal
                onCloseImportedModal={onCloseImportedModal}
              ></ImportPlaylistModal>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
