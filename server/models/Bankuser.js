const mongoose = require("mongoose");

const BankuserSchema = new mongoose.Schema({
    account: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 }, // Default value for balance
});


const BankuserModel = mongoose.model("bankuser", BankuserSchema);

module.exports = BankuserModel;
