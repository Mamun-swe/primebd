import React from 'react'
import Icon from 'react-icons-kit'
import { ic_play_circle_outline } from 'react-icons-kit/md'
import { Link } from 'react-router-dom'
import '../../App.scss'

const Index = ({ videos }) => {

    const sliceName = title => {
        return title.slice(0, 15)
    }

    return (
        <div>
            {videos && videos.map((video, i) =>
                <div className="card content-card" key={i}>
                    <Link
                        to={`/home/video/${video.id}/${video.title}/play`}
                    >
                        <div className="card-body shadow-sm">
                            <img src={video.banner} className="img-fluid" alt="..." />
                            {/* Overlay */}
                            <div className="overlay">
                                <div className="flex-center flex-column">
                                    <Icon icon={ic_play_circle_outline} size={35} style={{ color: '#fff' }} />
                                </div>
                                {/* Content */}
                                <div className="content">
                                    <p>{sliceName(video.title)}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Index;