const express = require("express");
const adminAuth = require("../middleware/auth");
const User = require("../models/user");
const adminRouter = express.Router()
const bcrypt = require("bcrypt")

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


adminRouter.post("/admin/password", adminAuth, async(req,res) => {
  try{
    const admin = req.admin
    const {oldPassword, newPassword} = req.body

     if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required"
      });
    }
    
    if(oldPassword === newPassword){
      return res.status(400).json({message: "New password cannot be same as the old password"})
    }

    // 1) Validate the old password
    const isPasswordValid = await admin.validatePassword(oldPassword)
    if(!isPasswordValid){
      return res.status(401).json({success: false , message: "Password is not valid"})
    }

    // 2) Hash the password
    const hashNewPassword = await bcrypt.hash(newPassword, 10)

    // 3) Save the new password
    admin.password = hashNewPassword
    await admin.save()

    res.json({success: true, message: "Password changed successfully"})

  }catch(err){
    res.status(500).json({message: err.message})
  }
})


module.exports = adminRouter