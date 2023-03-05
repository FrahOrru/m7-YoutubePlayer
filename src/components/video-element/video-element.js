import {VideoElementStyled, LittleVideoElementStyled} from './video-element-styled'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function VideoElement({ video, isLittle, onVideoClicked}) {
    
    const navigate = useNavigate();
    const [isChanging, setIsChanging] = useState(false);
    
    return(
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {
                isLittle ? 
                <LittleVideoElementStyled onClick={onVideoClicked(video.id.videoId)}>
                    <img src={video.snippet.thumbnails.url} alt="videoImage"></img>
                    <div>
                        <h3>{video.title}</h3>
                        <h4>{video.channelName}</h4>
                    </div>
                </LittleVideoElementStyled> :
                <VideoElementStyled onClick={onVideoClicked(video.id.videoId)} className="video-element">
                    <img src={video.snippet.thumbnails.url} alt="videoImage"></img>
                    <h3>{video.title}</h3>
                    <h4>{video.channelName}</h4>
                </VideoElementStyled>
            }
        </motion.div>
    )
}