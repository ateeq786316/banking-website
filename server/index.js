const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const BankuserModel = require("./models/bankuser");


const app = express(); // Initialize Express
const PORT = 3001; // Port for the server

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/bankuser")
    .then(() => {
       console.log("Connected to MongoDB");
    })
    .catch((error) => {
       console.error("Error connecting to MongoDB:", error);
    });
// Start the Server
app.listen(3001, () => {
  console.log(`Server is running`);
});


//singup request and response
app.post("/signup", (req, res) => {
      BankuserModel.create(req.body)
      .then(bankuser => res.json(bankuser))
      .catch(error => res.json({error: error.message}))
});

//login request and response
app.post("/login", (req, res) => {
      const {email, password} = req.body;
      BankuserModel.findOne({email: email})
      // BankuserModel.findOne({password: password})
      .then(bankuser => 
        {
                        if(bankuser)
                          {
                            if(bankuser.password === password){
                                res.json("success");
                            } else {
                                res.json("The password is incorrect");
                            }
                          }
                        else
                          {
                            res.json({message: "User not found"});
                          }
      })
});

//deposit request and response
app.post("/deposit", async (req, res) => {
  const { account, amount } = req.body;

  try {
    // Validate request parameters
    if (!account || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Find user by account number
    const user = await BankuserModel.findOne({ account: account });
    
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    const parsedAmount = parseFloat(amount);

    // Update the balance by incrementing the current balance with the deposit amount
    const result = await BankuserModel.updateOne(
      { account: user.account }, // Use the correct account field here
      { $inc: { balance: parsedAmount } }
    );

    // Check if the balance was successfully updated
    if (result.nModified === 0) {
      res.json({ message: "Deposit successful", balance: user.balance + parsedAmount });
    } 
    else {
      res.json({ message: "Deposit failed. No changes made to balance." });
    }
  } catch (error) {
    console.log("Server error:");
  }
});

//withdraw request and response
app.post("/withdraw", async (req, res) => {
  const { account, amount } = req.body;

  try {
    // Validate request parameters
    if (!account || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Find user by account number
    const user = await BankuserModel.findOne({ account: account });

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    const parsedAmount = parseFloat(amount);

    // Check if user has sufficient balance for the withdrawal
    if (user.balance < parsedAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update the balance by decrementing the balance by the withdrawal amount
    const result = await BankuserModel.updateOne(
      { account: user.account },
      { $inc: { balance: -parsedAmount } }
    );

    // Check if the balance was successfully updated
    if (result.nModified === 1) {
      res.json({
        message: "Withdrawal successful",
        balance: user.balance - parsedAmount, // return the updated balance
      });
    } else {
      res.json({ message: "Withdrawal failed. No changes made to balance." });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: error.message });
  }
});

//transfer request and response
app.post("/transfer", async (req, res) => {
  const { sourceAccount, destinationAccount, amount } = req.body;

  // Validate input
  if (!sourceAccount || !destinationAccount || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid input. Please check the entered values." });
  }

  try {
    // Find source account
    const source = await BankuserModel.findOne({ account: sourceAccount });
    if (!source) {
      return res.status(404).json({ message: "Source account not found." });
    }

    // Find destination account
    const destination = await BankuserModel.findOne({ account: destinationAccount });
    if (!destination) {
      return res.status(404).json({ message: "Destination account not found." });
    }

    // Check if source account has sufficient balance
    if (source.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance in source account." });
    }

    // Perform the transfer
    const parsedAmount = parseFloat(amount);

    // Update source account (subtract amount)
    const updateSource = await BankuserModel.updateOne(
      { account: sourceAccount },
      { $inc: { balance: -parsedAmount } }
    );

    // Update destination account (add amount)
    const updateDestination = await BankuserModel.updateOne(
      { account: destinationAccount },
      { $inc: { balance: parsedAmount } }
    );

    // Check if both updates were successful
    if (updateSource.nModified === 1 && updateDestination.nModified === 1) {
      return res.json({ message: "Transfer successful." });
    } else {
      return res.status(500).json({ message: "Transfer failed. Please try again." });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
});

//balance request and response
app.get("/balance/:account", async (req, res) => {
  const { account } = req.params;

  try {
    // Find user by account number
    const user = await BankuserModel.findOne({ account: account });
    
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Return the balance of the account
    res.json({ balance: user.balance });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
});


// Default Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

