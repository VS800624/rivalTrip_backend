const express = require("express")
const { validateSignUpData } = require("../utils/validation")
const authRouter = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

authRouter.post("/sign-up", async(req,res) => {
  try{

    // Validate the data
    validateSignUpData(req)

    const {firstName, lastName, emailId, password} = req.body

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10)

    // Creating new instance of the user 
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
    })

    const savedUser = await user.save()


    
  }catch(err){
    res.status(500).json({message: err.message})
  }
})