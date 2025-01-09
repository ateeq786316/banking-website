import { useState } from "react";
import React from "react";
import { Link } from 'react-router-dom';
import bankImage from './assets/bankimg.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Deposit() {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!account || !amount || isNaN(amount) || amount <= 0){
      alert("Please enter a valid account number and a positive deposit amount.")
      return
    }
    
    console.log("Account: ", account);
    console.log("Amount: ", amount);
    axios.post('http://localhost:3001/deposit', { account, amount })
      .then(result => {
        console.log(result);
        // Navigate to /home after successful deposit
        navigate('/home');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url("${bankImage}")`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <div className="card-body">
                <h1 className="text-center mb-4">Deposit</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="account" className="form-label"><h4>Account</h4></label>
                    <input type="text" id="account" className="form-control" placeholder="Enter account" required
                      onChange={(e) => setAccount(e.target.value)}
                    />
                    <input type="number" id="amount" className="form-control" placeholder="Enter deposit amount" required
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success"> Deposit </button>
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

export default Deposit;
