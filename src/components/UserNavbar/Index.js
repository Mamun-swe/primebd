import React, { useState } from 'react'
import '../../styles/components/UserNavbar/style.scss'
import { Icon } from 'react-icons-kit'
import { Link, NavLink, useHistory } from 'react-router-dom'
import {
    ic_menu,
    ic_mail_outline,
    ic_home,
    ic_list,
    ic_favorite,
    ic_ondemand_video,
    ic_cloud_upload,
    ic_power_settings_new,
    ic_keyboard_backspace
} from 'react-icons-kit/md'


const Index = ({ title, back }) => {
    const history = useHistory()
    const [show, setShow] = useState(false)

    const goBackPage = () => {
        history.goBack()
    }

    const doLogout = () => {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="user-navbar">
            {/* Topbar */}
            <div className="topbar">
                <div className="d-flex">

                    {/* Back button */}
                    {back ?
                        <div className="mr-1">
                            <button
                                type="button"
                                className="btn btn-light rounded-circle shadow-none py-1"
                                onClick={goBackPage}
                            >
                                <Icon icon={ic_keyboard_backspace} size={20} />
                            </button>
                        </div>
                        : null}

                    {/* Title */}
                    <div>
                        <p className="text-capitalize">{title ?? title}</p>
                    </div>

                    {/* Others */}
                    <div className="ml-auto">
                        <Link
                            to="/home/chat"
                            type="button"
                            className="btn btn-light rounded-circle shadow-none mr-2"
                        >
                            <Icon icon={ic_mail_outline} size={25} style={{ color: '#F4A261' }} />
                        </Link>
                        <button
                            type="button"
                            className="btn btn-light rounded-circle shadow-none"
                            onClick={() => setShow(true)}
                        >
                            <Icon icon={ic_menu} size={25} />
                        </button>
                    </div>
                </div>
            </div>


            {/* Sidebar */}
            <div
                className={show ? "backdrop open-backdrop" : "backdrop"}
                onClick={() => setShow(false)}
            >
                <div className={show ? "drawer open-drawer" : "drawer"}>
                    <ul>
                        <li>
                            <NavLink exact activeClassName="is-Active" to="/home/">
                                <Icon icon={ic_home} size={17} />
                                <span className="ml-2">Home</span>
                            </NavLink>
                            <NavLink exact activeClassName="is-Active" to="/home/categories">
                                <Icon icon={ic_list} size={17} />
                                <span className="ml-2">Categories</span>
                            </NavLink>
                            <NavLink exact activeClassName="is-Active" to="/home/favourite">
                                <Icon icon={ic_favorite} size={17} />
                                <span className="ml-2">Favourite</span>
                            </NavLink>
                            <NavLink exact activeClassName="is-Active" to="/home/my-videos">
                                <Icon icon={ic_ondemand_video} size={17} />
                                <span className="ml-2">My Videos</span>
                            </NavLink>
                            <NavLink exact activeClassName="is-Active" to="/home/upload">
                                <Icon icon={ic_cloud_upload} size={17} />
                                <span className="ml-2">Upload</span>
                            </NavLink>
                            <button type="button" className="btn" onClick={doLogout}>
                                <Icon icon={ic_power_settings_new} size={17} />
                                <span className="ml-2">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="break"></div>
        </div>
    );
};

export default Index;