import { useState } from "react";
import React from "react";
import {Link} from 'react-router-dom';
import bankImage from './assets/bankimg.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import balance from "./Balance";

function Balance(){
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);

    const fetchBalance = async () => {
        if(!account){
            setError("Account number is required");
            return;
        }
        axios.get(`http://localhost:3001/balance/${account}`)
        .then((response) => {
            setBalance(response.data.balance);
            setError(null);
        })
        .catch((error) => {
            setError(error.response.data.message);
            setBalance(null);
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
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        {/* White background for the form area */}
        <div className="card shadow-lg p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <h1 className="text-center mt-4 mb-4" style={{ fontWeight: "bold" }}>
            Check Account Balance
          </h1>

          <div className="form-group">
            <label htmlFor="account" className="form-label">
              Account Number
            </label>
            <input
              type="text"
              id="account"
              className="form-control"
              placeholder="Enter account number"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button onClick={fetchBalance} className="btn btn-primary btn-block">
              Check Balance
            </button>
          </div>
          <div className="d-flex justify-content-between mt-3">
                                              
                                              <Link to="/home" className="btn btn-primary">
                                                  HOME
                                              </Link>
            </div>

          {/* Display error or success message */}
          {error && (
            <div className="alert alert-danger mt-3 text-center">
              {error}
            </div>
          )}
          {balance !== null && !error && (
            <div className="alert alert-success mt-3 text-center">
              <strong>Balance: </strong>${balance}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

    );

}
export default Balance;