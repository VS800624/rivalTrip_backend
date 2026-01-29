const mongoose = require("mongoose")
const validator = require("validator")


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 3
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid Email Address: "+ value)
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Please enter a strong password");
      }
    }
  }
})

const User = mongoose.model("User", userSchema)
module.exports = User;