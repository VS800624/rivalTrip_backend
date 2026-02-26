const express = require("express");
const BusinessClassCountries = require("../models/businessClassCountries");
const adminAuth = require("../middleware/auth");
const { validateAndFormatDestination } = require("../utils/validation");
const { default: mongoose } = require("mongoose");
const businessClassCountriesRouter = express.Router();

// get business class countries
businessClassCountriesRouter.get("/business-class", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const businessClassCountries = await BusinessClassCountries.find({})
      .sort({
        countryName: 1,
      })
      .limit(limit);
    res.status(200).json({
      success: true,
      message: "Fetched Business Class Countries Successfully",
      businessClassCountries,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all business class countries admin
businessClassCountriesRouter.get(
  "/admin/business-class",
  adminAuth,
  async (req, res) => {
    try {
      const businessClassCountries = await BusinessClassCountries.find({}).sort({ createdAt: -1 });

      res.json({
        success: true,
        message: "Fetched business class countries successfully",
        count: businessClassCountries.length,
        businessClassCountries,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
);

// Get destination by Id (Admin)
businessClassCountriesRouter.get("/admin/business-class/:id",
  adminAuth,
  async(req,res) => {
    try{

      // Check if id is valid
      if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({message:"Invalid ID"})
      }
      
      // Find country
      const businessClassCountry = await BusinessClassCountries.findById(req.params.id)

      if (!businessClassCountry){
        return req.status(404).json({message:"Business class country not found"})
      }

      res.json({message:"Fetched business class country successfully", businessClassCountry})
      
    } catch(err){
      req.res(500).json({success:false, message: err.message})
    }
  }
)

// Create business class country
businessClassCountriesRouter.post("/admin/business-class", adminAuth, async(req,res) => {
  try{

    const validatedData = validateAndFormatDestination(req.data, true)

    const businessClassCountry = await BusinessClassCountries.create(validatedData)

    res.json({message: "Created business class country successfully", businessClassCountry})
    
  }catch(err){
     if(err.code === 11000 ){
      return res.status(409).json({message: "Destination with this slug already exists"})
    }
    res.status(500).json({success:false, message: err.message})
  }
})

// Update business class country
businessClassCountriesRouter.patch("/admin/business-class/:id", adminAuth, async(req,res) => {
  try{
    
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
          return res.status(400).json({message: "Invalid ID"})
    }

    const allowedFields = [
        "slug",
        "countryName",
        "city",
        "img",
        "headerImg",
        "discount",
        "discountValue",
        "price",
        "priceValue",
        "sections",
      ];

      const updates = {}

      allowedFields.forEach((fields) => {
        if(req.body[fields] != undefined){
          updates[fields] = req.body[fields]
        }
      })

      const validatedUpdates = validateAndFormatDestination(updates)

      const updated = await BusinessClassCountries.findByIdAndUpdate(
        req.params.id,
        validatedUpdates,
      { new: true, runValidators: true },
      )

       if(!updated){
      return res.status(404).json({message: "Best deals country not found"})
    }

    res.json({message: "Updated business class country successfully", updated})
    
  }catch(err){
    if(err.code === 11000 ){
      return res.status(409).json({message: "Destination with this slug already exists"})
    }
    res.status(500).json({message: err.message})
  }
})

// Delete business class
businessClassCountriesRouter.delete("/admin/business-class/:id", adminAuth, async(req,res) => {
  try{

    if(!mongoose.Types.ObjectId.isValid(req.body.id)){
      return res.status(400).json({message: "Invalid Id"})
    }

    const deletedBusinessClass = await BusinessClassCountries.findByIdAndDelete(req.body.id)

    if(!deletedBusinessClass){
      return res.status(404).json({message: "Business class country not found"})
    }

    res.json({message: "Deleted business class country successfully"}, deletedBusinessClass)

  }catch(err){
    res.status(500).json({message: err.message})
  }
})

module.exports = businessClassCountriesRouter;