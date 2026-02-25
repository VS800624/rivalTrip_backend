const express = require("express")
const adminAuth = require("../middleware/auth")
const User = require("../models/user")
const { default: mongoose } = require("mongoose")
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

// get user by id
userRouter.get("/admin/user/:id",
  // adminAuth,
  async(req,res) => {
    try{
      // Check if ID is valid
      if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({message:"Invalid Id"})
      }

      // Find user
      const user = await User.findById(req.params.id)

      if(!user){
        return res.status(404).json({message: "User not found"})
      }

      res.json({message: "Fetched user successfully", user})
      
    } catch(err){
      res.status(500).json({status:false, message: err.message})
    }
  }
)

module.exports = userRouter