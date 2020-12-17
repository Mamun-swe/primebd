import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../utils/url'

import Navbar from '../../../components/UserNavbar/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'
import AudioList from '../../../components/AudioList/Index'
import Player from '../../../components/AudioPayler/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(true)
    const [fourOFour, setFourOFour] = useState(false)
    const [audios, setAudios] = useState([])
    const [song, setSong] = useState()
    const id = localStorage.getItem('id')

    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    useEffect(() => {
        // Fecth Audios
        const fetchAudios = async () => {
            try {
                const response = await axios.get(`${api}user/my/audios/${id}`, header)
                setAudios(response.data.audios)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setFourOFour(true)
            }
        }

        fetchAudios()
    }, [])

    // Play Audio
    const playAudio = data => {
        setSong(data)
    }

    return (
        <div>
            <Navbar back={true} title={'My Audio'} />
            {fourOFour ? <FourOFourComponent messages={'Opps! Audio not found'} /> : null}
            {isLoading ? <LoadingComponent /> : null}
            <AudioList audios={audios} play={playAudio} />

            {/* Play Audio */}
            {song ? <Player song={song} /> : null}
        </div>
    );
};

export default Index;

