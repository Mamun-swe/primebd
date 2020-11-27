import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const Index = ({ song }) => {
    return (
        <div>
            <AudioPlayer
                autoPlay
                src={song}
                onPlay={e => console.log("onPlay")}
                onVolumeChange={e => console.log(e.target)}
            />
        </div>
    );
};

export default Index;