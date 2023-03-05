import { Navigate } from "react-router-dom";
import useSWR from "swr";
import VideoElement from '../video-element/video-element'
import './video-list.css'
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function VideoList() {
    const { data, error, isLoading } = useSWR(`https://youtube.thorsteinsson.is/api/search`, fetcher)

    const onVideoClicked = (id) => {
        Navigate(`/search/${id}`)
    }
    return(
        <div className="overflow">
            {
                data?.map((video) => (
                    <VideoElement onVideoClicked={onVideoClicked} key={video.id.videoId} video={video} isLittle={true}></VideoElement>
                ))
            }
        </div>
    )
}