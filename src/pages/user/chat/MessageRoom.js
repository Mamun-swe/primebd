import React, { useEffect, useState } from 'react'
import '../../../styles/user/chat/style.scss'
import { useParams } from 'react-router-dom'
import Icon from 'react-icons-kit'
import { ic_near_me } from 'react-icons-kit/md'
import { useForm } from 'react-hook-form'
import io from 'socket.io-client'

import Navbar from '../../../components/UserNavbar/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'
// import ScrollToBottom from 'react-scroll-to-bottom'

let socket;

const MessageRoom = () => {
    const { id, name } = useParams()
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const myId = localStorage.getItem('id')
    const ENDPOINT = 'localhost:4000'

    useEffect(() => {
        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] })
        socket.emit("join", myId)
        socket.on("message", (message) => {
            setMessages((exMessage) => [...exMessage, message])
        })
    }, [id, name, myId, ENDPOINT])

    // Submit Message
    const onSubmit = async (data, event) => {
        const messageData = {
            sender: myId,
            reciver: id,
            message: data.message
        }
        setMessages((exMessage) => [...exMessage, messageData])

        socket.emit('message', messageData, (response) => {
            if (response) {
                console.log('Successfully message send');
            }
        })
        event.target.reset()
    }


    useEffect(() => {
        const data = {
            sender: myId,
            reciver: id
        }
        socket.emit('getmessage', data, (response) => {
            setMessages(response)
        })
    }, []);



    return (
        <div className="message-room">
            {isLoading ? <LoadingComponent /> :
                <div>
                    <Navbar title={name} back={true} />

                    {/* Conversation Container */}
                    <div className="conversation-container">

                        {messages && messages.length > 0 ?
                            messages.map((items, i) =>

                                <div className="message" key={i} id="message">
                                    <div className="d-flex">
                                        {/* Reciver */}
                                        {items.reciver == myId ?
                                            <div className="person-name-circle rounded-circle mr-1">
                                                {/* <div className="flex-center flex-column">
                                                    <h6>{sliceName(items.message)}</h6>
                                                    <h6>{items.reciver}</h6>
                                                </div> */}
                                            </div>
                                            : null}

                                        {/* Conversation */}
                                        <div className={items.sender == myId ? "recived-message ml-auto text-right" : "sender-message text-left"}>
                                            <p>{items.message}</p>
                                        </div>

                                        {/* Sender */}
                                        {items.sender == myId ?
                                            <div className="person-name-circle rounded-circle ml-1 bg-primary">
                                                {/* <div className="flex-center flex-column">
                                                    <h6 className="text-white">{sliceName(items.message)}</h6>
                                                    <h6 className="text-white">{items.sender}</h6>
                                                </div> */}
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