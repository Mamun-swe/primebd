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
const Video = () => {
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [selectedBanner, setSelectedBanner] = useState(null)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [categories, setCategories] = useState([])
    const [fileErr, setFileErr] = useState({ banner: null, video: null })
    const [bannerPrev, setBannerPrev] = useState(null)
    const [videoPrev, setVideoPrev] = useState(null)

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

    // Banner onChange
    const bannerChangeHandeller = event => {
        let file = event.target.files[0]
        if (file) {
            setBannerPrev(URL.createObjectURL(file))
            setSelectedBanner(file)
        }
    }

    // Video onChange
    const videoChangeHandeller = event => {
        let file = event.target.files[0]
        if (file && file.size > 7000000) {
            setVideoPrev(null)
            setSelectedVideo(null)
            setFileErr({ video: 'Select less than 7 MB file' })
        } else {
            setVideoPrev(URL.createObjectURL(file))
            setSelectedVideo(file)
        }
    }

    const onSubmit = async (data) => {
        try {
            if (!selectedBanner) {
                return setFileErr({ banner: 'Banner is required' })
            }

            if (!selectedVideo) {
                return setFileErr({ video: 'Video is required' })
            }

            setLoading(true)
            let formData = new FormData()
            formData.append('user_id', localStorage.getItem('id'))
            formData.append('title', data.title)
            formData.append('category_id', data.category)
            formData.append('banner', selectedBanner)
            formData.append('video', selectedVideo)

            const response = await axios.post(`${url}admin/video`, formData, header)
            if (response.status === 200) {
                setLoading(false)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                console.log(error.response)
            }
        }
    }

    return (
        <div className="upload">
            <Navbar back={true} title={'Upload Video'} />
            <div className="container-fluid py-3">
                <div className="row">
                    <div className="col-12 px-5">
                        <div className="card border-0">
                            <div className="card-header p-3 text-center bg-white">
                                <Icon icon={ic_cloud_upload} size={40} style={{ color: '#F4A261' }} />
                                <h6 className="mb-0">Upload Your Video</h6>
                            </div>
                            <div className="card-body py-4 px-0">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Title */}
                                    <div className="form-group mb-3">
                                        {errors.title && errors.title.message ? (
                                            <small className="text-danger">{errors.title && errors.title.message}</small>
                                        ) : <small>Video title</small>
                                        }

                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control shadow-none rounded-0"
                                            placeholder="Enter video title"
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

                                    {/* Banner Image */}
                                    <div className="form-group mb-3">
                                        {fileErr && fileErr.banner ? (
                                            <small className="text-danger">{fileErr.banner}</small>
                                        ) : null}

                                        {bannerPrev ? <img src={bannerPrev} className="img-fluid" alt="..." /> : null}

                                        <input
                                            type="file"
                                            id="image"
                                            className="inputfile"
                                            accept="image/*"
                                            onChange={bannerChangeHandeller}
                                        />
                                        <label htmlFor="image">
                                            <p>Banner Image</p>
                                        </label>
                                    </div>

                                    {/* Video */}
                                    <div className="form-group mb-3">
                                        {fileErr && fileErr.video ? (
                                            <small className="text-danger">{fileErr.video}</small>
                                        ) : null}

                                        {videoPrev ?
                                            <div className="embed-responsive embed-responsive-16by9 mb-2">
                                                <iframe className="embed-responsive-item" title={videoPrev} src={videoPrev} allowFullScreen></iframe>
                                            </div>
                                            : null}

                                        <input
                                            type="file"
                                            id="video"
                                            className="inputfile"
                                            accept="video/*"
                                            onChange={videoChangeHandeller}
                                        />
                                        <label htmlFor="video">
                                            <p>Video file</p>
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

export default Video;