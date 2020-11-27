import React, { useEffect, useState } from 'react'
import '../../../styles/user/chat/style.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import api from '../../../utils/url'
import Icon from 'react-icons-kit'
import { ic_near_me } from 'react-icons-kit/md'
import { useForm } from 'react-hook-form'

import Navbar from '../../../components/UserNavbar/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const MessageRoom = () => {
    const { id, name } = useParams()
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])


    useEffect(() => {
        // Fetch Messages
        const fetchMessages = async () => {
            try {
                const result = await axios.get(`${api}comments`)
                setMessages(result.data.slice(0, 10))
                setLoading(false)
            } catch (error) {
                if (error && error.response.status === 404) {
                    setLoading(false)
                }
                console.log(error.response)
            }
        }
        fetchMessages()
    }, [id, name])


    // Slice Name
    const sliceName = name => {
        return name.slice(0, 1)
    }

    // Submit Message
    const onSubmit = async (data) => {
        console.log(data)
    }

    return (
        <div className="message-room">
            {isLoading ? <LoadingComponent /> :
                <div>
                    <Navbar title={name} back={true} />

                    {/* Conversation Container */}
                    <div className="conversation-container">
                        {messages && messages.length > 0 ?
                            messages.map((message, i) =>

                                <div className="message" key={i} id="message">
                                    <div className="d-flex">

                                        {/* Sender */}
                                        {i != id ?
                                            <div className="person-name-circle rounded-circle mr-1">
                                                <div className="flex-center flex-column">
                                                    <h6>{sliceName(name)}</h6>
                                                </div>
                                            </div>
                                            : null}

                                        {/* Conversation */}
                                        <div className={i == id ? "recived-message ml-auto text-right" : "sender-message text-left"}>
                                            <p>
                                                {i + ' Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum.'}
                                            </p>
                                        </div>

                                        {/* Reciver */}
                                        {i == id ?
                                            <div className="person-name-circle rounded-circle ml-1 bg-primary">
                                                <div className="flex-center flex-column">
                                                    <h6 className="text-white">{sliceName(message.email)}</h6>
                                                </div>
                                            </div>
                                            : null}
                                    </div>
                                </div>

                            )
                            : <FourOFourComponent messages={'No message found.'} />}
                    </div>


                    {/* Message Sent Container */}
                    <div className="message-sent-container shadow">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-flex">
                                <div className="flex-fill">
                                    <input
                                        type="text"
                                        name="message"
                                        className={errors.message ? "form-control shadow-none error-border" : "form-control shadow-none border-0"}
                                        placeholder="Write message..."
                                        ref={register({ required: true })}
                                    />
                                </div>
                                <div className="ml-1">
                                    <button type="submit" className="btn rounded-circle shadow-none">
                                        <div className="flex-center flex-column">
                                            <Icon icon={ic_near_me} size={24} style={{ color: '#007cfa' }} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default MessageRoom;