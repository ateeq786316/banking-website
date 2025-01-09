import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import bankImage from './assets/bankimg.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PayBill() {
    const [account, setAccount] = useState("");
    const [billAmount, setBillAmount] = useState("");
    const [billType, setBillType] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sending data to the backend
            const response = await axios.post('http://localhost:3001/paybill', { account, amount: billAmount});

            if (message === "Bill payment successful.") 
            {
                alert(`Bill payment successful!`);
                setMessage(`Bill payment successful!`);
                setAccount("");
                setBillAmount("");
                setBillType("");
            } 
            else 
            {
                alert(message);
                setMessage(message);
            }
        } 
        catch (error) {
            console.error("Error during bill payment:", error);

            const errorMessage =
                error.response && error.response.data
                    ? error.response.data.message
                    : "An unexpected error occurred. Please try again later.";

            alert(errorMessage);
            setMessage(errorMessage);
        }
    };

    return (
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
                                <h1 className="text-center mb-4">Pay Bill</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="account" className="form-label">Account Number</label>
                                        <input
                                            type="text"
                                            id="account"
                                            className="form-control"
                                            placeholder="Enter your account number"
                                            value={account}
                                            required
                                            onChange={(e) => setAccount(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="billType" className="form-label">Bill Type</label>
                                        <select
                                            id="billType"
                                            className="form-control"
                                            value={billType}
                                            required
                                            onChange={(e) => setBillType(e.target.value)}
                                        >
                                            <option value="">Select Bill Type</option>
                                            <option value="Electricity">Electricity</option>
                                            <option value="Water">Water</option>
                                            <option value="Internet">Internet</option>
                                            <option value="Gas">Gas</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="billAmount" className="form-label">Bill Amount</label>
                                        <input
                                            type="number"
                                            id="billAmount"
                                            className="form-control"
                                            placeholder="Enter bill amount"
                                            value={billAmount}
                                            required
                                            onChange={(e) => setBillAmount(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <button type="submit" className="btn btn-success">Pay Bill</button>
                                        <Link to="/home" className="btn btn-primary">HOME</Link>
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

export default PayBill;
