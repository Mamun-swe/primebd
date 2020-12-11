import React, { useEffect, useState } from 'react'
import axios from 'axios'
import url from '../../../utils/url'

import Navbar from '../../../components/UserNavbar/Index'
import CategoryList from '../../../components/CategoryList/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        // Fetch Categories
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${url}user/category`)
                setCategories(response.data)
                setLoading(false)
            } catch (error) {
                if (error) {
                    setLoading(false)
                }
            }
        }

        fetchCategories()
    }, [])


    return (
        <div className="categories">
            <Navbar
                title={'Categories'}
                back={true}
            />

            {isLoading ? <LoadingComponent /> :
                <div className="container">
                    <div className="row">
                        {categories && categories.length > 0 ?
                            < div className="col-12 px-1">
                                <CategoryList categories={categories} />
                            </div>
                            :
                            <div className="col-12 p-4">
                                <FourOFourComponent />
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Index;