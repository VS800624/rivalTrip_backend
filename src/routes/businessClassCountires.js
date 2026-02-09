const express = require("express");
const BusinessClassCountries = require("../models/businessClassCountries");
const adminAuth = require("../middleware/auth");
const { validateAndFormatDestination } = require("../utils/validation");
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
      const businessClassCountries = (
        await BusinessClassCountries.find({})
      ).sort({ createdAt: -1 });

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


// Create business class country
businessClassCountriesRouter.put("/admin/business-class", adminAuth, async(req,res) => {
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

module.exports = businessClassCountriesRouter;
