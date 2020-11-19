import React, { useEffect, useState } from 'react'
import '../../../styles/admin/style.scss'
import axios from 'axios'
import api from '../../../utils/url'


import Navbar from '../../../components/AdminNavbar/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

import demoImg from '../../../assets/movie.jpg'
import { Link } from 'react-router-dom'
import Icon from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md'

const Index = () => {
    const [isLoading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        // Fecth Categories
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${api}users`)
                setCategories(response.data)
                setLoading(false)
            } catch (error) {
                if (error) {
                    console.log(error.response)
                    setLoading(false)
                }
            }
        }

        fetchCategories()
    }, [])


    return (
        <div className="category-index">
            <Navbar back={true} title={'Categories'} />

            {/* Category List */}
            <div className="categories">
                {isLoading ? <LoadingComponent /> :
                    categories && categories.length > 0 ?
                        categories && categories.map((category, i) =>
                            <div className="category d-flex" key={i}>
                                <div>
                                    <img src={demoImg} className="img-fluid" alt="..." />
                                </div>
                                <div className="pl-2">
                                    <p>{category.name}</p>
                                </div>
                            </div>
                        )
                        :
                        <div className="col-12 p-4">
                            <FourOFourComponent messages={'No category found'} />
                        </div>
                }
            </div>

            {/* Float Button */}
            <Link
                to="/admin/category/create"
                type="button"
                className="btn btn-info rounded-circle shadow-none float-btn"
            >
                <Icon icon={ic_add} size={25} style={{ color: '#fff' }} />
            </Link>
        </div>
    );
};

export default Index;