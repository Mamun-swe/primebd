import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import url from '../../../utils/url';
import '../../../styles/user/upload-video/style.scss';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../../../components/AdminNavbar/Index'
import LoadingComponent from '../../../components/Loading/Index'

const Edit = () => {
    const { id } = useParams()
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [category, setCategory] = useState()
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState()

    useEffect(() => {
        fetchCategory()
    }, [id])

    // Fetch Category 
    const fetchCategory = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${url}admin/category/${id}`)
            if (response.status === 200) {
                setLoading(false)
                setCategory(response.data)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    // Image onChange
    const imageChangeHandeller = event => {
        let file = event.target.files[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
            setSelectedFile(file)
        }
    }

    const onSubmit = async (data) => {
        try {

            let formData = new FormData()
            formData.append('name', data.name)
            formData.append('image', selectedFile || category.image)
            formData.append('_method', 'PUT')

            setUpdateLoading(true)
            const response = await axios.post(`${url}admin/category/${category.id}`, formData)
            if (response.data.status === true) {
                toast.success(response.data.message)
                setUpdateLoading(false)
            }
            if (response.data.status === false) {
                toast.warn(response.data.message)
                setUpdateLoading(false)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    return (
        <div className="category-create upload">
            <Navbar back={true} title={'Edit Category'} />
            {isLoading ? <LoadingComponent /> : null}

            <div className="container-fluid py-3">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-group mb-4">
                                {errors.name && errors.name.message ? (
                                    <small className="text-danger">{errors.name && errors.name.message}</small>
                                ) : <small>Name</small>
                                }
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control rounded-0 shadow-none"
                                    placeholder="Enter name"
                                    defaultValue={category ? category.name : null}
                                    ref={register({
                                        required: "Name is required"
                                    })}
                                />
                            </div>

                            {/* Image */}
                            {preview ? <img src={preview} className="img-fluid" alt="..." />
                                : category ? <img src={category.image} className="img-fluid" alt="..." /> : null}


                            <div className="form-group mt-2 mb-4">
                                <input
                                    type="file"
                                    id="banner"
                                    className="inputfile"
                                    accept="image/*"
                                    onChange={imageChangeHandeller}
                                />
                                <label htmlFor="banner">
                                    <p>Banner Image</p>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-block btn-primary rounded-0 text-white shadow-none"
                                disabled={updateLoading}
                            >
                                {updateLoading ? <span>Updating...</span> : <span>Update</span>}
                            </button>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Edit;