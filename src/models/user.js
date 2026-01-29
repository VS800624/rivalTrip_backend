const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 3,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 3,
    trim : true
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
    select: false,   //select: false hides password in queries
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Please enter a strong password");
      }
    }
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, {timestamps: true})

// Create login token:
// Creates a JWT token for the user
// Token contains: User _id
// Token expires in 1 day
// This token proves the user is logged in
userSchema.methods.generateAuthToken() = async function(){
  const user = this;
  // jwt.sign(payload, secret, options)
  const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
    expiresIn: "1d"
  })
  return token
}

userSchema.methods.validatePassword() = async function(passwordInputByUser){
  const user = this;
  const passwordHash = user.password
  // bcrypt.compare(plainText, hash)
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
  return isPasswordValid
}


const User = mongoose.model("User", userSchema)
module.exports = User;