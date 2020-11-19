import React from 'react'
import Icon from 'react-icons-kit'
import { ic_remove_red_eye } from 'react-icons-kit/md'
import { Link } from 'react-router-dom'
import '../../App.scss'

import Banner from '../../assets/movie.jpg'

const Index = ({ videos }) => {

    return (
        <div>
            {videos && videos.map((video, i) =>
                <div className="card content-card" key={i}>
                    <Link
                        to={`/admin/videos/${video.id}/${video.name}`}
                    >
                        <div className="card-body shadow-sm">
                            <img src={Banner} className="img-fluid" alt="..." />
                            {/* Overlay */}
                            <div className="overlay">
                                <div className="flex-center flex-column">
                                    <Icon icon={ic_remove_red_eye} size={30} style={{ color: '#fff' }} />
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