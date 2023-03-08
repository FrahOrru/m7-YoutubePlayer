import { useContext } from "react";
import PlaylistContext from "../../context/PlaylistContext";
import { ListStyled } from "../styled/list-styled";
import { ModalStyled } from "../styled/modal-styled";

export default function AddToPlaylistModal({ onClose, onPlaylistChoosed }) {
  const { playlists } = useContext(PlaylistContext);

  return (
    <ModalStyled className="modal glass" style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <div className="close" onClick={() => onClose()}>
          &times;
        </div>
      </div>
      <h2>Select the playlist</h2>
      <div className="modal-content">
        <div className="modal-playlist-list glass">
          <ListStyled className="no-padding">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <li
                  key={playlist.name}
                  className="txt-black"
                  style={{ padding: "0" }}
                  onClick={() => onPlaylistChoosed(playlist.id)}
                >
                  <div>
                    <p>{playlist.name}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="txt-black ">create a playlist before</p>
            )}
          </ListStyled>
        </div>
      </div>
    </ModalStyled>
  );
}
