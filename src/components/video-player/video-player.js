import YouTube from 'react-youtube';

export default function VideoPlayer({videoId}) {
    const opts = {
        height: '480',
        width: '854',
        playerVars: {
          autoplay: 1,
        },
      };

    return (
        <div className='player'>
            <YouTube videoId={videoId} opts={opts} />
        </div>
    )
}