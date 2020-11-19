import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import url from '../../../utils/url'
import ReactPlayer from 'react-player'

import Navbar from '../../../components/AdminNavbar/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const Show = () => {
    const { id, name } = useParams()
    const [video, setVideo] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [fourOfour, setFourOFour] = useState(false)

    useEffect(() => {
        fetchVideo()
    }, [id, name])

    // Fetch Video
    const fetchVideo = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${url}posts/${id}`)
            if (response.status === 200) {
                setLoading(false)
                setVideo(response.data)
            }
        } catch (error) {
            if (error && error.response.status === 404) {
                setLoading(false)
                setFourOFour(true)
            }
            console.log(error.response)
        }
    }

    if (fourOfour) {
        return (
            <div>
                <Navbar back={true} title={name} />
                <FourOFourComponent />
            </div>
        )
    }

    return (
        <div>
            {isLoading ? <LoadingComponent /> : null}
            <Navbar back={true} title={name} />

            <div className="container">
                <div className="row">

                    {/* Player */}
                    <div className="col-12 p-0">
                        <ReactPlayer
                            url={'https://youtu.be/ndW4jE98MKU'}
                            width="100%"
                            height="100%"
                            controls={true}
                        />
                    </div>
                    <div className="col-12 py-3">
                        <p className="mb-0" style={{ fontSize: 14 }}>
                            <span className="font-weight-bold text-capitalize">Title: </span>{video.title}
                        </p>
                        <p className="mb-0" style={{ fontSize: 14 }}>
                            <span className="font-weight-bold text-capitalize">Author: </span>lorem ipsum
                        </p>
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="button"
                            className="btn shadow-none"
                            style={styles.btn}
                        >
                            Banned Video
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Show;

const styles = {
    btn: {
        fontSize: 15,
        color: '#000',
        fontWeight: 700,
        background: '#dfdfdf',
        padding: '8px 20px'
    }
}