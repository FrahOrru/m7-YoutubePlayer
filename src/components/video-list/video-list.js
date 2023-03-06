import { useEffect, useState } from "react";
import useSWR from "swr";
import VideoElement from '../video-element/video-element'
import './video-list.css'
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function VideoList({isChangingPage, research}) {

    const [params, setParams] = useState('');

    const { data, error, isLoading } = useSWR(`https://youtube.thorsteinsson.is/api/search${params}`, fetcher, {
        revalidateOnMount: true,
        refreshInterval: 0,
        refreshWhenHidden: false,
        refreshWhenOffline: false,
        shouldRetryOnError: false
    })

    useEffect(() => {
        if(research !== '') {
            setParams(`?q=${research}&limit=8`);
        } else {
            setParams(research)
        }
    }, [research])

    return(
        <div className="overflow">
            {
                    !data ? (
                    Array(10).fill(null).map((_, index) => <span key={index} className="loader-horizontal"></span>)) : 
                    null
            }
            {
                data?.map((video) => (
                    <VideoElement isChangingPage={() => isChangingPage()} key={video.id.videoId} video={video} isLittle={true}></VideoElement>
                ))
            }
        </div>
    )
}