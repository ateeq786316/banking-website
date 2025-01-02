import { useState } from "react";
import React from "react";
import {Link} from 'react-router-dom';
import bankImage from './assets/bankimg.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Transfer(){
    const [sourceAccount, setSourceAccount] = useState("");
    const [destinationAccount, setDestinationAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!sourceAccount || !destinationAccount || !amount || isNaN(amount) || amount <= 0)
            {setMessage("Invalid request");
            return;
            }
        axios.post('http://localhost:3001/transfer',{sourceAccount,destinationAccount,amount})
        .then(response => {
            setMessage(response.data.message);
        })
        .catch((error) =>
        {
            console.log(error);
            setMessage("Transfer failed");
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
            <div className="card shadow">
              <div className="card-body">
                <h1 className="text-center mb-4">Transfer Money</h1>
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
                                                                  
                                                                  <Link to="/home" className="btn btn-primary">
                                                                      HOME
                                                                  </Link>
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