import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const endpointLogin = "http://127.0.0.1:8000/api/auth/login";
const endpointMe = "http://127.0.0.1:8000/api/auth/me";

function Login() {
    const navigate = useNavigate(); //hook

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(endpointLogin, {
                email,
                password,
            });

            const token = response.data.access_token;
            await getUserData(token);
        } catch (error) {
            alert(error);
        }
    };

    const getUserData = async (token) => {
        try {
            const response = await axios.post(
                endpointMe,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const role = response.data.role_id;
            // console.log(role)

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            if (role === 1) {
                console.log(response);
                navigate("/maestro/home");
            } else if (role === 2) {
                navigate("/alumno/home");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div
                            className="card bg-dark text-white"
                            style={{ borderRadius: "1rem" }}
                        >
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">
                                        Login
                                    </h2>
                                    <p className="text-white-50 mb-5">
                                        Please enter your login and password!
                                    </p>

                                    <form onSubmit={handleLogin}>
                                        <div
                                            data-mdb-input-init
                                            className="form-outline form-white mb-4"
                                        >
                                            <input
                                                type="email"
                                                id="typeEmailX"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="form-control form-control-lg"
                                                required
                                            />
                                            <label
                                                className="form-label"
                                                htmlFor="typeEmailX"
                                            >
                                                Email
                                            </label>
                                        </div>

                                        <div
                                            data-mdb-input-init
                                            className="form-outline form-white mb-4"
                                        >
                                            <input
                                                type="password"
                                                id="typePasswordX"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                className="form-control form-control-lg"
                                                required
                                            />
                                            <label
                                                className="form-label"
                                                htmlFor="typePasswordX"
                                            >
                                                Password
                                            </label>
                                        </div>

                                        <p className="small mb-5 pb-lg-2">
                                            <a
                                                className="text-white-50"
                                                href="#!"
                                            >
                                                Forgot password?
                                            </a>
                                        </p>

                                        <button
                                            data-mdb-button-init
                                            data-mdb-ripple-init
                                            className="btn btn-outline-light btn-lg px-5"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </form>

                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#!" className="text-white">
                                            <i className="fab fa-facebook-f fa-lg"></i>
                                        </a>
                                        <a href="#!" className="text-white">
                                            <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                                        </a>
                                        <a href="#!" className="text-white">
                                            <i className="fab fa-google fa-lg"></i>
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-0">
                                        Don't have an account?{" "}
                                        <a
                                            href="#!"
                                            className="text-white-50 fw-bold"
                                        >
                                            Sign Up
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
