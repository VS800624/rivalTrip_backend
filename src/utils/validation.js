const validator = require("validator")

const validateSignUpData = (req) => {
  const {firstName, lastName, emailId , password} = req.body

  if(typeof firstName !== "string" || typeof lastName !== "string"){
    throw new Error ("Name should be string")
  }

  if(!firstName || !lastName){
    throw new Error("Please enter the full name")
  }

  if(typeof emailId !== "string" || !validator.isEmail(emailId)){
    throw new Error("Email is not valid")
  }

  if(typeof password !== "string" || !validator.isStrongPassword(password)){
     throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.") 
  }
}

// const validateUpdatePopularDestination

module.exports = {validateSignUpData,}