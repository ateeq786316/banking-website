import { useState } from "react";
import React from "react";
import {Link} from 'react-router-dom';
import bankImage from './assets/bankimg.jpg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home(){
 
    return(
        <div
            className="container-fluid vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url("${bankImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                            <div className="card-body">
                                <h1 className="text-center mb-4">Welcome to the Bank</h1>
                                <p className="text-center text-muted">
                                    Choose an action to perform below.
                                </p>
                                <hr />
                                <div className="row g-4 text-center">
                                    <div className="col-md-6">
                                        <Link to="/deposit" className="btn btn-info shadow-lg p-4 w-100 rounded-3" style={{ backgroundColor: "rgba(90, 90, 90, 0.9)", color: "white" }}>
                                            <h3>Deposit</h3>
                                            <i className="fas fa-money-bill-wave fa-3x mt-3"></i>
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="/withdraw" className="btn btn-danger shadow-lg p-4 w-100 rounded-3" style={{ backgroundColor: "rgba(90, 90, 90, 0.9)", color: "white" }}>
                                            <h3>Withdraw</h3>
                                            <i className="fas fa-hand-holding-usd fa-3x mt-3"></i>
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="/transfer" className="btn btn-warning shadow-lg p-4 w-100 rounded-3" style={{ backgroundColor: "rgba(90, 90, 90, 0.9)", color: "white" }}>
                                            <h3>Transfer</h3>
                                            <i className="fas fa-exchange-alt fa-3x mt-3"></i>
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="/balance" className="btn btn-info shadow-lg p-4 w-100 rounded-3 text-white" style={{ backgroundColor: "rgba(90, 90, 90, 0.9)", color: "white" }}>
                                            <h3>Show Balance</h3>
                                            <i className="fas fa-chart-line fa-3x mt-3"></i>
                                        </Link>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mt-3">
                                    <Link to="/login" className="btn btn-secondary">
                                        Logout
                                    </Link>
                                    <Link to="/paybill" className="btn btn-primary">
                                        Pay Bills
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;
