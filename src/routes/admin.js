const express = require("express");
const adminAuth = require("../middleware/auth");
const User = require("../models/user");
const adminRouter = express.Router()

adminRouter.put("/make-admin/:id", adminAuth, async(req, res) => {
  try{

    if (user.role === "admin") {
      return res.status(400).json({ message: "User is already an admin" });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      {role: "admin"},
      {new: true} 
  );
  res.json({message: "User promoted to admin", user})
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

adminRouter.put("/remove-admin/:id", adminAuth, async(req,res) => {
  try{
    if (user.role === "admin") {
      return res.status(400).json({ message: "User is already not an admin" });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {role: "user"},
      {new: true}
    );
    res.json({message: "Admin role removed", user})
  }catch(err){
    res.status(500).json({message: err.message})
  }
})



module.exports = adminRouter