import { useState } from "react";
import React from "react";
import {Link} from 'react-router-dom';
import bankImage from './assets/bankimg.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then(result => {
            console.log(result)
            if(result.data === "success"){
                navigate('/home')
            }
        })
        .catch(error => console.log(error))
    }

    return(
        <div
        onSubmit={handleSubmit}
            className="container-fluid vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url("${bankImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
        <div className="container mt-5" >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Login</h1>
                            <p className="text-center text-muted">Please fill in this form to login.</p>
                            <hr />

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"> Email </label>
                                    <input type="email" id="email" className="form-control" placeholder="Enter your email" name="email" required
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="psw" className="form-label"> Password </label>
                                    <input type="password" id="psw" className="form-control" placeholder="Enter your password" name="psw" required
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-secondary">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>

                            <div className="text-center mt-3">
                                <p className="text-muted">Don't have an account?{" "} <Link to="/signup" className="text-decoration-none">Sign up here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Login;