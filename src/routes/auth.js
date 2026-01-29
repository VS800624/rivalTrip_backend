const express = require("express")
const { validateSignUpData } = require("../utils/validation")
const authRouter = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

authRouter.post("/signup", async(req,res) => {
  try{
    // Validate the data
    validateSignUpData(req)

    const {firstName, lastName, emailId, password} = req.body

    // Encrypt the password
    // Converts password into unreadable format
    // Protects user even if DB is hacked
    const passwordHash = await bcrypt.hash(password, 10)

    // Creating new instance of the user 
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
    })

    // Save user in DB
    const savedUser = await user.save()
    // Create JWT token
    const token = await savedUser.generateAuthToken()

    // res.cookie("token", token, {
    //    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    //     httpOnly: true,
    // })

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,        // REQUIRED for HTTPS (Render)
    //   sameSite: "none",    // REQUIRED for Netlify → Render
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });

    const userResponse = savedUser.toObject();
    delete userResponse.password;
    
    res.json({message: "User added successfully", userResponse})
    
  }catch(err){
    if (err.name === "ValidationError") {
    return res.status(400).json({ message: "ERROR: " + err.message })
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: "Email already exists" });
  }

   res.status(500).json({ message: "Internal Server Error: " + err.message });
  
  }
})

module.exports = authRouter