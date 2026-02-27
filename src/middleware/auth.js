const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = async(req, res, next) => {
  try{

    //  const authHeader = req.headers.authorization;

    // if (!authHeader) {
    //   return res.status(401).json({ message: "No token provided" });
    // }

    // const token = authHeader.split(" ")[1];
    
    const {token} = req.cookies

    if(!token){
      return res.status(401).json({message: "Not authenticated"})
    }

     // validate the token (secret key) and decode and return the payload (the data (_id) you originally stored in the token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user =  await User.findById(decoded._id).select("+password");

     if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Checking if the user is admin or not
    if (user.role !== "admin"){
      return res.status(403).json({message: "Admin access only"})
    }

    req.admin = user
    next()
  
  }catch(err){
    return res.status(401).json({message: "Invalid or expired token"})
  }
}

const userAuth = async(req,res,next) => {
  try{

    const {token} = req.cookies

    if(!token){
      return res.status(401).json({message: "Not authenticated"})
    }

    const decoded = jwt.verify(token, process.env.SECRET_JWT)
    const user = await User.findById(decoded._id)

    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    req.user =  user
    next()    
  } catch(err){
    return res.status(401).json({message:"Invalid or expired token"})
  }
}

module.exports = {adminAuth, userAuth}
