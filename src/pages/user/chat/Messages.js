import React, { useEffect, useState } from 'react'
import '../../../styles/user/chat/style.scss'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import api from '../../../utils/url'

import Navbar from '../../../components/UserNavbar/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const Messages = () => {
    const [isLoading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        // Fetch Messages
        const fetchMessages = async () => {
            try {
                const result = await axios.get(`${api}users`)
                setMessages(result.data)
                setLoading(false)
            } catch (error) {
                if (error && error.response.status === 404) {
                    setLoading(false)
                }
                console.log(error.response)
            }
        }
        fetchMessages()
    }, [])

    // Slice Name
    const sliceName = name => {
        return name.slice(0, 1)
    }

    return (
        <div className="messages">
            {isLoading ? <LoadingComponent /> :
                <div>
                    <Navbar title={'Messages'} back={true} />
                    <div className="d-flex links-tab border-bottom">
                        <div className="flex-fill text-center">
                            <NavLink exact activeClassName="is-Active" to="/home/chat/">Messages</NavLink>
                        </div>
                        <div className="flex-fill text-center">
                            <NavLink exact activeClassName="is-Active" to="/home/chat/peoples">Peoples</NavLink>
                        </div>
                    </div>


                    {/* Person who sent message */}
                    <div className="messages-persons">

                        {messages && messages.length > 0 ?
                            messages.map((message, i) =>
                                <Link to={`/home/chat/messages/${message.name}/${message.id}`} key={i}>
                                    <div className="message">
                                        <div className="d-flex">
                                            <div className="name-circle rounded-circle">
                                                <div className="flex-center flex-column">
                                                    <h5 className="text-uppercase mb-0">{sliceName(message.name)}</h5>
                                                </div>
                                            </div>
                                            <div className="pl-2 person">
                                                <p className="text-capitalize mb-0">{message.name}</p>
                                                <small>1 new message</small>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                            : <FourOFourComponent messages={'No message found.'} />}

                    </div>
                </div>
            }
        </div>
    );
};

export default Messages;