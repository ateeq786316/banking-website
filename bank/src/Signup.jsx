import { useState } from "react";
import React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import bankImage from './assets/bankimg.jpg';
import { useNavigate } from "react-router-dom";

function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [account, setAccount] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/signup',{account,name,email,password})
        .then(result => {console.log(result)
            navigate('/login')
        })
        .catch(error => console.log(error))
    }
    

    return (
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
                            <h1 className="text-center mb-4">Sign Up</h1>
                            <p className="text-center text-muted">Please fill in the form below to create an account.</p>
                            <hr/>

                            <form>
                            <div className="mb-3">
                                    <label htmlFor="account" className="form-label"><b>Account</b></label>
                                    <input type="text" id="account"className="form-control" placeholder="Enter your Account e.g (ateeq786316)" name="account" required
                                    onChange={(e) => setAccount(e.target.value)}
                                    />
                                    
                                </div>
                            <div className="mb-3">
                                    <label htmlFor="name" className="form-label"><b>Name</b></label>
                                    <input type="text" id="name"className="form-control" placeholder="Enter your Name" name="name" required
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                    
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"><b>Email</b></label>
                                    <input type="email" id="email"className="form-control" placeholder="Enter your email" name="email" required
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label"> <b>Password</b> </label>
                                    <input type="password" id="psw" className="form-control" placeholder="Enter your password" name="password" required 
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-secondary"> Cancel </button>
                                    <button type="submit" className="btn btn-primary"> Sign Up  </button>
                                </div>
                            </form>

                            <div className="text-center mt-3">
                                <p className="text-muted">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-decoration-none"> Login here </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    );
}
export default Signup;