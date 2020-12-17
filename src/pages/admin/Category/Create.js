import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import '../../../styles/user/upload-video/style.scss'
import axios from 'axios'
import url from '../../../utils/url'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from '../../../components/AdminNavbar/Index'
toast.configure()
const Create = () => {
    const { register, handleSubmit, errors } = useForm()
    const [fileErr, setFileErr] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    // Image onChange
    const imageChangeHandeller = event => {
        let file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    const onSubmit = async (data) => {
        try {
            if (!selectedFile) {
                return setFileErr(true)
            }

            let formData = new FormData()
            formData.append('name', data.name)
            formData.append('image', selectedFile)

            setLoading(true)
            const response = await axios.post(`${url}admin/category`, formData, header)
            if (response.data.status === true) {
                toast.success(response.data.message)
                setLoading(false)
            }
            if (response.data.status === false) {
                toast.warn(response.data.message)
                setLoading(false)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }
    return (
        <div className="category-create upload">
            <Navbar back={true} title={'Create Category'} />

            <div className="container-fluid py-3">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Name */}
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
                                    ref={register({
                                        required: "Name is required"
                                    })}
                                />
                            </div>

                            {/* Image */}
                            <div className="form-group mb-4">
                                {fileErr ? <small className="text-danger">Banner is required</small>
                                    : <small>Banner</small>
                                }
                                <br />
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
                                disabled={isLoading}
                            >
                                {isLoading ? <span>Creating...</span> : <span>Create</span>}
                            </button>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Create;
