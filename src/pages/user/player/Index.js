import React, { useEffect, useState } from 'react'
import '../../../styles/user/player/style.scss'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import api from '../../../utils/url'
import Icon from 'react-icons-kit'
import { ic_favorite_border } from 'react-icons-kit/md'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from '../../../components/UserNavbar/Index'
import VideoList from '../../../components/VideoList/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

import LoadingGif from '../../../assets/static/loading.gif'

toast.configure()
const Index = () => {
    const { id, name } = useParams()
    const [show, setShow] = useState(false)
    const [videoURL, setVideoURL] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [videos, setVideos] = useState([])

    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    useEffect(() => {

        // Show Video
        const showVideo = async () => {
            try {
                const response = await axios.get(`${api}user/video/${id}/show`, header)
                setVideoURL(response.data.video.video)
                setLoading(false)
            } catch (error) {
                if (error) {
                    console.log(error.response)
                }
            }
        }

        // Fetch Related videos
        const fetchRelatedVideos = async () => {
            try {
                const response = await axios.get(`${api}user/home`, header)
                setVideos(response.data.videos)
                setLoading(false)
            } catch (error) {
                if (error) {
                    setLoading(false)
                }
            }
        }

        showVideo()
        fetchRelatedVideos()
    }, [id, name])

    const sliceName = name => {
        if (name) {
            return name.slice(0, 15)
        }
        return false
    }

    // Add to Favourite List
    const addFavourite = async (id) => {
        const data = {
            uId: localStorage.getItem('id'),
            videoId: id
        }

        try {
            setShow(true)
            const response = await axios.post(`${api}user/video/favourite`, data, header)

            if (response.status === 200) {
                setShow(false)
                toast.success(response.data.message)
            }

            if (response.status === 208) {
                setShow(false)
                toast.info(response.data.message)
            }
        } catch (error) {
            if (error) {
                setShow(false)
                toast.warn(error.response.data.message)
            }
        }
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
                                        disabled={show}
                                    >
                                        {show ?
                                            <img src={LoadingGif} alt="..." style={{ width: 27, height: 27 }} />
                                            : <Icon icon={ic_favorite_border} size={27} />}
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