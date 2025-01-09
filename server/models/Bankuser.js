const mongoose = require("mongoose");

const BankuserSchema = new mongoose.Schema({
    account: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true ,
        validate: {
            validator: function (value) {
                // Regex to validate that the email ends with "@gmail.com"
                return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
            },
            message: props => `${props.value} is not a valid Gmail address!`
        }
    },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 }, // Default value for balance
});


const BankuserModel = mongoose.model("bankuser", BankuserSchema);

module.exports = BankuserModel;
