import axios from "axios";

export function addPlaylist(playlistName) {
  return axios
    .post("https://youtube.thorsteinsson.is/api/playlists", {
      name: playlistName,
    })
    .then((resp) => resp.data);
}

export function getPlaylist(playlistId) {
  return axios
    .get(`https://youtube.thorsteinsson.is/api/playlists/${playlistId}`)
    .then((resp) => ({ ...resp.data, id: playlistId }));
}

export function removePlaylist({ playlist, playlistId }) {
  return axios
    .put(
      ` https://youtube.thorsteinsson.is/api/playlists/${playlistId}`,
      playlist
    )
    .then((resp) => ({ ...resp.data, id: playlistId }));
}

export function addVideoToPlaylist({ playlistId, video }) {
  return axios
    .post(
      `https://youtube.thorsteinsson.is/api/playlists/${playlistId}/videos`,
      video
    )
    .then((resp) => resp.data);
}
