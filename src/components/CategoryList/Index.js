import React from 'react'
import '../../App.scss'
import { Link } from 'react-router-dom'

import Banner from '../../assets/movie.jpg'

const Index = ({ categories }) => {
    const sliceName = name => {
        return name.slice(0, 10)
    }

    return (
        <div>
            {categories && categories.map((category, i) =>
                <div className="card content-card" key={i}>
                    <Link
                        to={`/home/category/${category.id}/${category.name}/videos`}
                    >
                        <div className="card-body shadow-sm">
                            <img src={Banner} className="img-fluid" alt="..." />
                            {/* Overlay */}
                            <div className="overlay">
                                <div className="flex-center flex-column">
                                    <h6>{sliceName(category.name)}</h6>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Index;