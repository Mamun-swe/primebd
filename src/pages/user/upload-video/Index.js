import React, { useState } from 'react'
import '../../../styles/user/upload-video/style.scss'
import Icon from 'react-icons-kit'
import { useForm } from "react-hook-form"
import { ic_cloud_upload } from 'react-icons-kit/md'

import Navbar from '../../../components/UserNavbar/Index'

const Index = () => {
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [progress, setProgress] = useState(10)

    const onSubmit = async (data) => {
        console.log(data)
        setLoading(true)
    }

    return (
        <div className="upload">
            <Navbar
                title={'Upload video'}
                back={true}
            />

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
                                            <option>abc</option>
                                            <option>abc</option>
                                            <option>abc</option>
                                        </select>
                                    </div>

                                    {/* Banner Image */}
                                    <div className="form-group mb-3">
                                        <input type="file" id="image" className="inputfile" accept="image/*" />
                                        <label htmlFor="image">
                                            <p>Banner Image</p>
                                        </label>
                                    </div>

                                    {/* Video */}
                                    <div className="form-group mb-3">
                                        <input type="file" id="video" className="inputfile" accept="video/*" />
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
                        <h1 onClick={() => setLoading(false)}>{progress}%</h1>
                    </div>
                </div>
                : null}
        </div>
    );
};

export default Index;