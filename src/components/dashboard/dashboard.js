import './dashboard.css';
import {SearchBarStyled} from '../seach-input/search-input'
import { useState } from 'react';
import useSWR from "swr";
import VideoElement from "../video-element/video-element"
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {

    const [searchText, setSearchText] = useState('');
    const [params, setParams] = useState('');

    const { data, error } = useSWR(
        `https://youtube.thorsteinsson.is/api/search${params}`, fetcher ,
        {
            revalidateOnMount: true,
            refreshInterval: 0,
            refreshWhenHidden: false,
            refreshWhenOffline: false,
            shouldRetryOnError: false
        }
    );

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        if(event.target.value !== '') {
            setParams(`?q=${event.target.value}`);
        } else {
            setParams(event.target.value)
        }
    }

   return(
        <div className="Dashboard">
            <SearchBarStyled value={searchText} onChange={handleSearchChange} className='glass' type="text" placeholder="Search.."></SearchBarStyled>
            <div className='videos'>
                {
                    !data ? (
                    Array(10).fill(null).map((_, index) => <span key={index} className="loader"></span>)) : 
                    null
                }
                {
                    data?.map((video) => (
                    <VideoElement isChangingPage={() => {}} key={video.id.videoId} video={video}></VideoElement>
                    ))
                }
            </div>
        </div>
   )
}