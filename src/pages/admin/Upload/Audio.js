import React, { useEffect, useState } from 'react'
import '../../../styles/user/upload-video/style.scss'
import Icon from 'react-icons-kit'
import { useForm } from "react-hook-form"
import { ic_cloud_upload } from 'react-icons-kit/md'
import axios from 'axios'
import url from '../../../utils/url'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from '../../../components/AdminNavbar/Index'

toast.configure()
const Audio = () => {
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedAudio, setSelectedAudio] = useState(null)
    const [fileErr, setFileErr] = useState({ audio: null })

    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    useEffect(() => {
        // Fetch Categories
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${url}admin/category`, header)
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

    // Audio onChange
    const audioChangeHandeller = event => {
        let file = event.target.files[0]
        if (file && file.size > 7000000) {
            setSelectedAudio(null)
            setFileErr({ audio: 'Select less than 7 MB file' })
        } else {
            setSelectedAudio(file)
        }
    }

    const onSubmit = async (data) => {
        try {
            if (!selectedAudio) {
                return setFileErr({ audio: 'Audio is required' })
            }

            setLoading(true)
            let formData = new FormData()
            formData.append('user_id', localStorage.getItem('id'))
            formData.append('title', data.title)
            formData.append('category_id', data.category)
            formData.append('audio', selectedAudio)

            const response = await axios.post(`${url}admin/audio`, formData, header)
            if (response.status === 200) {
                setLoading(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    return (
        <div className="upload">
            <Navbar back={true} title={'Upload Audio'} />
            <div className="container-fluid py-3">
                <div className="row">
                    <div className="col-12 px-5">
                        <div className="card border-0">
                            <div className="card-header p-3 text-center bg-white">
                                <Icon icon={ic_cloud_upload} size={40} style={{ color: '#F4A261' }} />
                                <h6 className="mb-0">Upload Audio</h6>
                            </div>
                            <div className="card-body py-4 px-0">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Title */}
                                    <div className="form-group mb-3">
                                        {errors.title && errors.title.message ? (
                                            <small className="text-danger">{errors.title && errors.title.message}</small>
                                        ) : <small>Audio title</small>
                                        }

                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control shadow-none rounded-0"
                                            placeholder="Enter audio title"
                                            ref={register({
                                                required: "Title is required",
                                            })}
                                        />
                                    </div>

                                    {/* Category */}
                                    <div className="form-group mb-3">
                                        {errors.category && errors.category.message ? (
                                            <small className="text-danger">{errors.category && errors.category.message}</small>
                                        ) : <small>Select category</small>
                                        }

                                        <select
                                            name="category"
                                            className="form-control shadow-none rounded-0 pl-2"
                                            ref={register({
                                                required: "Category is required",
                                            })}
                                        >
                                            {categories && categories.map((category, i) =>
                                                <option value={category.id} key={i}>{category.name}</option>
                                            )}
                                        </select>
                                    </div>

                                    {/* Audio */}
                                    <div className="form-group mb-3">
                                        {fileErr && fileErr.audio ? (
                                            <small className="text-danger">{fileErr.audio}</small>
                                        ) : null}
                                        <input
                                            type="file"
                                            id="audio"
                                            className="inputfile"
                                            accept="audio/*"
                                            onChange={audioChangeHandeller}
                                        />
                                        <label htmlFor="audio">
                                            <p>Audio file</p>
                                        </label>
                                    </div>

                                    <button type="submit" className="btn btn-primary rounded-0 shadow-none text-white btn-block">Upload</button>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Uploading Progress */}
            {isLoading ?
                <div className="upload-progress">
                    <div className="flex-center flex-column">
                        <h6>Uploading...</h6>
                        <p>Don't leave before complete.</p>
                    </div>
                </div>
                : null}
        </div>
    );
};

export default Audio;