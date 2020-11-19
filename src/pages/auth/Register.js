import React from 'react'
import '../../styles/auth/style.scss'
import { useForm } from "react-hook-form"
import Logo from '../../assets/static/logo.png'
import { Link } from 'react-router-dom'

const Register = () => {
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
    }

    return (
        <div className="auth">
            <div className="flex-center flex-column">
                <div className="card border-0">
                    <div className="card-header text-center bg-white border-0">
                        <img src={Logo} className="img-fluid" alt="..." />
                        <h4>Create Account</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Name */}
                            <div className="form-group mb-3">
                                {errors.name && errors.name.message ? (
                                    <small className="text-danger">{errors.name && errors.name.message}</small>
                                ) : <small>Username</small>
                                }

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control shadow-none"
                                    placeholder="Enter username"
                                    ref={register({
                                        required: "Username is required"
                                    })}
                                />
                            </div>

                            {/* Email */}
                            <div className="form-group mb-3">
                                {errors.email && errors.email.message ? (
                                    <small className="text-danger">{errors.email && errors.email.message}</small>
                                ) : <small>E-mail</small>
                                }

                                <input
                                    type="text"
                                    name="email"
                                    className="form-control shadow-none"
                                    placeholder="Your e-mail"
                                    ref={register({
                                        required: "E-mail is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                            </div>

                            {/* Password */}
                            <div className="form-group mb-3">
                                {errors.password && errors.password.message ? (
                                    <small className="text-danger">{errors.password && errors.password.message}</small>
                                ) : <small>Password</small>
                                }

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control shadow-none"
                                    placeholder="*****"
                                    ref={register({
                                        required: "Please enter password",
                                    })}
                                />
                            </div>

                            <button type="submit" className="btn btn-info shadow-none text-white btn-block">Submit</button>
                            <br />

                            <div className="text-right">
                                <p>Already have an account ? <Link to="/">Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;