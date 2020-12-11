import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const Index = ({ song }) => {
    return (
        <div style={styles.playerContainer}>
            <AudioPlayer
                style={styles.player}
                autoPlay
                src={song}
                // onPlay={e => console.log("onPlay")}
                // onVolumeChange={e => console.log(e.target.volume)}
            />
        </div>
    );
};

export default Index;

const styles = {
    playerContainer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 999
    },
    player: {
        background: '#b11654',
    }
}