import React, { useEffect, useState } from 'react'
import axios from 'axios'
import url from '../../../utils/url'

import Navbar from '../../../components/AdminNavbar/Index'
import VideoList from '../../../components/AdminVideoList/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(false)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        // Fetch All videos
        const fetchVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${url}admin/video`)
                setVideos(response.data.videos)
                setLoading(false)
            } catch (error) {
                if (error) {
                    setLoading(false)
                    console.log(error.response)
                }
            }
        }

        fetchVideos()
    }, [])

    return (
        <div className="videos">
            <Navbar back={true} title={'Videos'} />
            {isLoading ? <LoadingComponent /> :
                <div className="container">
                    <div className="row">
                        {videos && videos.length > 0 ?
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