import React from 'react'
import Navbar from '../../../components/AdminNavbar/Index'

const Index = () => {
    return (
        <div className="dashboard">
            <Navbar back={false} title={'Dashboard'} />
            <div className="container">
                <div className="row">

                    <div className="col-6 p-0">
                        <div className="card border-0 p-2">
                            <div className="card-body shadow-sm bg-warning p-2" style={style.cardBody}>
                                <div className="flex-center flex-column">
                                    <p className="mb-1" style={style.p}>120</p>
                                    <h5 className="mb-0">Users</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 p-0">
                        <div className="card border-0 p-2">
                            <div className="card-body shadow-sm bg-warning p-2" style={style.cardBody}>
                                <div className="flex-center flex-column">
                                    <p className="mb-1" style={style.p}>120</p>
                                    <h5 className="mb-0">Category</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 p-0">
                        <div className="card border-0 p-2">
                            <div className="card-body shadow-sm bg-warning p-2" style={style.cardBody}>
                                <div className="flex-center flex-column">
                                    <p className="mb-1" style={style.p}>120</p>
                                    <h5 className="mb-0">Video</h5>
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