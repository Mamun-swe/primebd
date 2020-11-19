import React, { useEffect, useState } from 'react'
import '../../../styles/user/player/style.scss'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import url from '../../../utils/url'
import Icon from 'react-icons-kit'
import { ic_favorite_border } from 'react-icons-kit/md'

import Navbar from '../../../components/UserNavbar/Index'
import VideoList from '../../../components/VideoList/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const Index = () => {
    const { id, name } = useParams()
    const [videoURL, setVideoURL] = useState('https://youtu.be/ndW4jE98MKU')
    const [isLoading, setLoading] = useState(false)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        // Fetch Related videos
        const fetchRelatedVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${url}users`)
                setVideos(response.data)
                setLoading(false)
            } catch (error) {
                if (error) {
                    console.log(error)
                }
            }
        }

        fetchRelatedVideos()
    }, [id, name])

    const sliceName = name => {
        return name.slice(0, 15)
    }

    // Add Favourite List
    const addFavourite = video => {
        alert(video)
    }

    return (
        <div className="player">
            <Navbar title={sliceName(name)} back={true} />

            <div className="container">
                <div className="row">

                    {/* Player */}
                    <div className="col-12 p-0">
                        <ReactPlayer
                            url={videoURL}
                            width="100%"
                            height="100%"
                            controls={true}
                        />
                    </div>

                    <div className="col-12 p-0 mb-2">
                        <div className="title-box shadow-sm">
                            <div className="d-flex">
                                <div><p>{name}</p></div>
                                <div className="ml-auto">
                                    <button
                                        type="button"
                                        className="btn shadow-none p-0"
                                        onClick={() => addFavourite(id)}
                                    >
                                        <Icon icon={ic_favorite_border} size={27} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Related Videos */}
            {isLoading ? <LoadingComponent /> :
                <div className="container">
                    <div className="row">
                        {videos.length > 0 ?
                            < div className="col-12 px-1">
                                <VideoList videos={videos} />
                            </div>
                            :
                            <div className="col-12 p-4">
                                <FourOFourComponent />
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Index;