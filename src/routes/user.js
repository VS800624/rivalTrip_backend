const express = require("express")
const adminAuth = require("../middleware/auth")
const User = require("../models/user")
const userRouter = express.Router()

// get all users
userRouter.get("/admin/users", 
  // adminAuth,
  async (req,res) => {
    try{
      const users = await User.find({}).sort({
        createdAt: -1,
      });

      if (!users) {
        return res.status(404).json("User not found")
      }

      res.json({message:"Fetched users successfully", users, count: users.length})
      
    }catch(err){
      res.status(500).json({status: false , message:err.message})
    }
  }
)

module.exports = userRouter