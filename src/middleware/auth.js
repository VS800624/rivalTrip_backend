const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = async(req, res, next) => {
  try{
    const {token} = req.cookie

    if(!token){
      return res.status(401).json({message: "Not authenticated"})
    }

     // validate the token (secret key) and decode and return the payload (the data (_id) you originally stored in the token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne(decoded._id)

    // Checking if the user is admin or not
    if (!user || user.role !== "admin"){
      return res.status(401).json({message: "Admin access only"})
    }

    req.admin = user
    next()
  
  }catch(err){
    res.status(401).json({message: "Invalid token"})
  }
}

module.exports = adminAuth
