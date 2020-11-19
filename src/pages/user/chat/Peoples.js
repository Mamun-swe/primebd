import React, { useEffect, useState } from 'react'
import '../../../styles/user/chat/style.scss'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import api from '../../../utils/url'
import Icon from 'react-icons-kit'
import { socialWhatsapp } from 'react-icons-kit/ionicons'

import Navbar from '../../../components/UserNavbar/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const Peoples = () => {
    const [isLoading, setLoading] = useState(true)
    const [peoples, setPeoples] = useState([])

    useEffect(() => {
        // Fetch Peoples
        const fetchPeoples = async () => {
            try {
                const result = await axios.get(`${api}users`)
                setPeoples(result.data)
                setLoading(false)
            } catch (error) {
                if (error && error.response.status === 404) {
                    setLoading(false)
                }
                console.log(error.response)
            }
        }
        fetchPeoples()
    }, [])

    // Slice Name
    const sliceName = name => {
        return name.slice(0, 1)
    }

    return (
        <div className="peoples">
            {isLoading ? <LoadingComponent /> :
                <div>
                    <Navbar title={'Peoples'} back={true} />
                    <div className="d-flex links-tab border-bottom">
                        <div className="flex-fill text-center">
                            <NavLink exact activeClassName="is-Active" to="/home/chat/">Messages</NavLink>
                        </div>
                        <div className="flex-fill text-center">
                            <NavLink exact activeClassName="is-Active" to="/home/chat/peoples">Peoples</NavLink>
                        </div>
                    </div>


                    {/* Person who created account */}
                    <div className="account-created-persons">
                        {peoples && peoples.length > 0 ?
                            peoples.map((people, i) =>
                                <Link to={`/home/chat/messages/${people.name}/${people.id}`} key={i}>
                                    <div className="people">
                                        <div className="d-flex">
                                            <div className="name-circle rounded-circle">
                                                <div className="flex-center flex-column">
                                                    <h5 className="text-uppercase mb-0">{sliceName(people.name)}</h5>
                                                </div>
                                            </div>
                                            <div className="pl-2 person-name">
                                                <p className="text-capitalize mb-0">{people.name}</p>
                                            </div>
                                            <div className="ml-auto message-icon">
                                                <Icon icon={socialWhatsapp} size={25} style={{ color: '#F4A261' }} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                            : <FourOFourComponent messages={'No people found.'} />}
                    </div>
                </div>
            }
        </div>
    );
};

export default Peoples;