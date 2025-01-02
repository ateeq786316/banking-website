import { useState } from "react";
import React from "react";
import {Link} from 'react-router-dom';
import bankImage from './assets/bankimg.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Withdraw(){

    const [account, setAccount] = useState("");
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/withdraw',{account,amount})
        .then(result => {
            console.log(result);
            navigate('/home');
        })
        .catch(error => console.log(error));
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
                <h1 className="text-center mb-4">Withdraw</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="account" className="form-label"> Account Number </label>
                    <input type="text" id="account" className="form-control" placeholder="Enter account" required
                      onChange={(e) => setAccount(e.target.value)}
                    />
                    <label htmlFor="amount" className="form-label"> Amount </label>
                    <input
                      type="number"
                      id="amount"
                      className="form-control"
                      placeholder="Enter withdrawal amount"
                      required
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-danger">
                      Withdraw
                    </button>
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
export default Withdraw;