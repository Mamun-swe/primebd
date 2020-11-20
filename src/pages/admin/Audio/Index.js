import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../utils/url'
import Icon from 'react-icons-kit'
import { ic_play_circle_outline } from 'react-icons-kit/md'

import Navbar from '../../../components/AdminNavbar/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(true)
    const [fourOFour, setFourOFour] = useState(false)
    const [audios, setAudios] = useState([])

    useEffect(() => {
        // Fecth Audios
        const fetchAudios = async () => {
            try {
                const response = await axios.get(`${api}users`)
                setAudios(response.data)
                setLoading(false)
            } catch (error) {
                if (error && error.response.status === 404) {
                    console.log(error.response)
                    setLoading(false)
                    setFourOFour(true)
                }
            }
        }

        fetchAudios()
    }, [])

    return (
        <div>
            <Navbar back={true} title={'Audio'} />
            {fourOFour ? <FourOFourComponent messages={'Opps! Audio not found'} /> : null}
            {isLoading ? <LoadingComponent /> : null}
            <div className="audio-list">
                {audios && audios.map((audio, i) =>
                    <div className="category d-flex" key={i}>
                        <div>
                            <Icon icon={ic_play_circle_outline} size={20} />
                        </div>
                        <div className="pl-2">
                            <p>{audio.name}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;