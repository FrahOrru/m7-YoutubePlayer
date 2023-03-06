import {VideoElementStyled, LittleVideoElementStyled} from './video-element-styled'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function VideoElement({ video, isLittle, isChangingPage }) {
    
    const navigate = useNavigate();

    const onVideoClicked = () => {
        isChangingPage(true);

        navigate(`/search/${video.id.videoId}`)
    }
    
    return(
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {
                isLittle ? 
                <LittleVideoElementStyled onClick={onVideoClicked}>
                    <img src={video.snippet.thumbnails.url} alt="videoImage"></img>
                    <div>
                        <h3>{video.title}</h3>
                        <h4>{video.channelName}</h4>
                    </div>
                </LittleVideoElementStyled> :
                <VideoElementStyled onClick={onVideoClicked} className="video-element">
                    <img src={video.snippet.thumbnails.url} alt="videoImage"></img>
                    <h3>{video.title}</h3>
                    <h4>{video.channelName}</h4>
                </VideoElementStyled>
            }
        </motion.div>
    )
}