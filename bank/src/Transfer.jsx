import { useState } from "react";
import React from "react";
import {Link, Navigate} from 'react-router-dom';
import bankImage from './assets/bankimg.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Transfer(){
    const [sourceAccount, setSourceAccount] = useState("");
    const [destinationAccount, setDestinationAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:3001/transfer", { sourceAccount, destinationAccount, amount })
        .then((result) => {
          console.log("Server Response:", result.data);
          setMessage(result.data.message);
          setTimeout(() => {
            console.log("Navigating to /home...");
            navigate("/home");
          }, 500);
        })
        .catch((error) => {
          console.error("Error during transfer:", error);
          setMessage("Transfer failed");
          setTimeout(() => {setMessage("");}, 1500);
        });
    };
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
          <div className="col-md-6">
            <div className="card shadow-lg p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <div className="card-body">

                <h1 className="text-center mb-4">Transfer Money</h1>
                {/* Display the message */}
                {message && (
                                    <div className="alert alert-info" role="alert">
                                        {message}
                                    </div>
                                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="sourceAccount" className="form-label">
                      Source Account
                    </label>
                    <input
                      type="text"
                      id="sourceAccount"
                      className="form-control"
                      placeholder="Enter source account number"
                      required
                      onChange={(e) => setSourceAccount(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="destinationAccount" className="form-label">
                      Destination Account
                    </label>
                    <input
                      type="text"
                      id="destinationAccount"
                      className="form-control"
                      placeholder="Enter destination account number"
                      required
                      onChange={(e) => setDestinationAccount(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amount"
                      className="form-control"
                      placeholder="Enter transfer amount"
                      required
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-warning">Transfer</button>
                    <div className="d-flex justify-content-between mt-3">
                        <Link to="/home" className="btn btn-primary"> HOME </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
);
}
export default Transfer;