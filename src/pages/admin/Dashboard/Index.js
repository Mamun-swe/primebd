import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../utils/url'
import Navbar from '../../../components/AdminNavbar/Index'
import LoadingComponenr from '../../../components/Loading/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        // Dashboard data
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api}admin/dashboard`)
                if (response.status === 200) {
                    setData(response.data)
                    setLoading(false)
                }
            } catch (error) {
                if (error) {
                    setLoading(false)
                }
            }
        }

        fetchData()
    }, [])

    return (
        <div className="dashboard">
            {isLoading ? <LoadingComponenr /> : null}

            <Navbar back={false} title={'Dashboard'} />
            <div className="container">
                <div className="row">

                    <div className="col-6 p-0">
                        <div className="card border-0 p-2">
                            <div className="card-body shadow-sm bg-warning p-2" style={style.cardBody}>
                                <div className="flex-center flex-column">
                                    <p className="mb-1" style={style.p}>{data.users ? data.users : "0"}</p>
                                    <h5 className="mb-0">Users</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 p-0">
                        <div className="card border-0 p-2">
                            <div className="card-body shadow-sm bg-warning p-2" style={style.cardBody}>
                                <div className="flex-center flex-column">
                                    <p className="mb-1" style={style.p}>{data.category ? data.category : "0"}</p>
                                    <h5 className="mb-0">Category</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 p-0">
                        <div className="card border-0 p-2">
                            <div className="card-body shadow-sm bg-warning p-2" style={style.cardBody}>
                                <div className="flex-center flex-column">
                                    <p className="mb-1" style={style.p}>{data.video ? data.video : "0"}</p>
                                    <h5 className="mb-0">Video</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 p-0">
                        <div className="card border-0 p-2">
                            <div className="card-body shadow-sm bg-warning p-2" style={style.cardBody}>
                                <div className="flex-center flex-column">
                                    <p className="mb-1" style={style.p}>{data.audio ? data.audio : "0"}</p>
                                    <h5 className="mb-0">Audio</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Index;

let style = {
    cardBody: {
        height: 130,
        borderRadius: 6
    },
    p: {
        fontSize: 20,
        fontWeight: 300
    }
}