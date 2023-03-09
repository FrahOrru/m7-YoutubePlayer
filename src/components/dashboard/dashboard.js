import "./dashboard.css";
import { SearchBarStyled } from "../styled/search-input";
import { useState } from "react";
import useSWR from "swr";
import VideoElement from "../video-element/video-element";
import AddToPlaylistModal from "../add-to-playlist-modal/add-to-playlist-modal";
import { useMutation, useQueryClient } from "react-query";
import { addVideoToPlaylist } from "../../api/playlists";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const [params, setParams] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tmpVideoToAdd, setTmpVideoToAdd] = useState(null);

  const { data, error } = useSWR(
    `https://youtube.thorsteinsson.is/api/search${params}`,
    fetcher,
    {
      revalidateOnMount: true,
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      shouldRetryOnError: false,
    }
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    if (event.target.value !== "") {
      setParams(`?q=${event.target.value}`);
    } else {
      setParams(event.target.value);
    }
  };

  const onAddToPlaylistModalOpen = (video) => {
    setIsModalOpen(true);
    setTmpVideoToAdd(video);
  };

  const onPlaylistChoosed = (playId) => {
    mutate({ playlistId: playId, video: tmpVideoToAdd });
  };

  const queryClient = useQueryClient();

  const {
    status,
    error: errore,
    mutate,
  } = useMutation({
    mutationFn: addVideoToPlaylist,
    onSuccess: (newPlaylist) => {
      queryClient.setQueryData(
        ["addVideoToPlaylist", newPlaylist.id],
        newPlaylist
      );
      setTmpVideoToAdd(null);
      setIsModalOpen(false);
    },
  });

  return (
    <div className="Dashboard">
      <SearchBarStyled
        value={searchText}
        onChange={handleSearchChange}
        className="glass"
        type="text"
        placeholder="Search.."
      ></SearchBarStyled>
      <div className="videos">
        {!data
          ? Array(10)
              .fill(null)
              .map((_, index) => <span key={index} className="loader"></span>)
          : null}
        {data?.map((video) => (
          <VideoElement
            mode="dashboard"
            isChangingPage={() => {}}
            key={video.id.videoId}
            video={video}
            onAddToPlaylistModal={() => onAddToPlaylistModalOpen(video)}
          ></VideoElement>
        ))}

        {isModalOpen ? (
          <AddToPlaylistModal
            className="glass"
            onClose={() => setIsModalOpen(false)}
            onPlaylistChoosed={onPlaylistChoosed}
          ></AddToPlaylistModal>
        ) : null}
      </div>
    </div>
  );
}
