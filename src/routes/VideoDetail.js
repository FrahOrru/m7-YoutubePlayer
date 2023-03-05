import { useState } from "react";
import {SearchBarStyled} from "../components/seach-input/search-input"
import useSWR from "swr";
import { Navigate, useParams } from "react-router-dom";
import VideoPlayer from "../components/video-player/video-player"
import VideoList from "../components/video-list/video-list";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function VideoDetail() {

    const [searchText, setSearchText] = useState('');
    const { videoId } = useParams();

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    }

    const { data, error } = useSWR(
        `https://youtube.thorsteinsson.is/api/videos/${videoId}`, fetcher
    );

    
    return (
        <div className="glass video-detail">
            <div className='searchBar'>
                <SearchBarStyled value={searchText} onChange={handleSearchChange} className='glass' type="text" placeholder="Search.."></SearchBarStyled>
            </div>

            <div className="video-player">
                <VideoPlayer videoId={videoId}></VideoPlayer> 
                <div className="video-right">
                    <VideoList></VideoList>
                </div>           
            </div>
        </div>
    )
}