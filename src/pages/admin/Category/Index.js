import React, { useEffect, useState } from 'react'
import '../../../styles/admin/style.scss'
import axios from 'axios'
import api from '../../../utils/url'
import { Link } from 'react-router-dom'
import Icon from 'react-icons-kit'
import { ic_add, ic_mode_edit } from 'react-icons-kit/md'

import Navbar from '../../../components/AdminNavbar/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    useEffect(() => {
        // Fecth Categories
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${api}admin/category`, header)
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
                                    <img src={category.image} className="img-fluid" alt="..." />
                                </div>
                                <div className="pl-2">
                                    <p>{category.name}</p>
                                </div>
                                <div className="ml-auto">
                                    <Link
                                        to={`/admin/category/${category.id}/show`}
                                        type="button"
                                        className="btn btn-sm btn-light rounded-circle shadow-none"
                                        style={styles.smBtn}
                                    >
                                        <Icon icon={ic_mode_edit} size={18} />
                                    </Link>
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

const styles = {
    smBtn: {
        padding: '5px 7px'
    }
}