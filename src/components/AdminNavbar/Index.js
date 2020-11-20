import React, { useState } from 'react'
import '../../styles/components/UserNavbar/style.scss'
import { Icon } from 'react-icons-kit'
import { Link, NavLink, useHistory } from 'react-router-dom'
import {
    ic_menu,
    ic_dashboard,
    ic_toc,
    ic_ondemand_video,
    ic_cloud_upload,
    ic_power_settings_new,
    ic_keyboard_backspace,
    ic_audiotrack,
    ic_queue_music
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
                            <NavLink exact activeClassName="is-Active" to="/admin/">
                                <Icon icon={ic_dashboard} size={17} />
                                <span className="ml-2">Dashboard</span>
                            </NavLink>
                            <NavLink exact activeClassName="is-Active" to="/admin/category">
                                <Icon icon={ic_toc} size={17} />
                                <span className="ml-2">Categories</span>
                            </NavLink>
                            <NavLink exact activeClassName="is-Active" to="/admin/videos">
                                <Icon icon={ic_ondemand_video} size={17} />
                                <span className="ml-2">Videos</span>
                            </NavLink>
                            <NavLink exact activeClassName="is-Active" to="/admin/audio">
                                <Icon icon={ic_queue_music} size={17} />
                                <span className="ml-2">Audio</span>
                            </NavLink>
                            <NavLink exact activeClassName="is-Active" to="/admin/upload/video">
                                <Icon icon={ic_cloud_upload} size={17} />
                                <span className="ml-2">Upload Video</span>
                            </NavLink>
                            <NavLink exact activeClassName="is-Active" to="/admin/upload/audio">
                                <Icon icon={ic_audiotrack} size={17} />
                                <span className="ml-2">Upload Audio</span>
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