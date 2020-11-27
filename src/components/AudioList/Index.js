import React from 'react';
import Icon from 'react-icons-kit'
import { ic_play_circle_outline } from 'react-icons-kit/md'

const Index = ({ audios, play }) => {

    const playSong = data => {
        play(data)
    }

    return (
        <div className="audio-list">
            {audios && audios.map((audio, i) =>
                <div
                    key={i}
                    style={styles.audioBox}
                    className="audio d-flex"
                    onClick={() => playSong(audio)}
                >
                    <div>
                        <Icon icon={ic_play_circle_outline} size={20} />
                    </div>
                    <div className="pl-2">
                        <p style={styles.audioBox.text}>{audio.name}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Index;

const styles = {
    audioBox: {
        padding: '10px 8px',
        fontSize: 14,
        borderBottom: '1px solid #dfdfdf',
        text: {
            marginBottom: 0,
        }
    },
}