const express = require("express");
const BestDealsCountries = require("../models/bestDealsCountries");
const adminAuth = require("../middleware/auth");
const bestDealsCountriesRouter = express.Router();

// Get best deals countries
bestDealsCountriesRouter.get("/best-deals", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0
    const bestDealsCountries = await BestDealsCountries.find({}).sort({
      countryName: 1,
    }).limit(limit);
    res
      .status(200)
      .json({
        success: true,
        message: "Fetched Best Deals Countries Data Successfully",
        bestDealsCountries,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get best deals countries (Admin)
bestDealsCountriesRouter.get("/admin/best-deals", adminAuth, async(req,res) => {
  try{

    const bestDealsCountries = await BestDealsCountries.find({}).sort({createdAt: -1})

    res.status(200).json({success: true, message: "Fetched Best Deals Countries Data Successfully", bestDealsCountries, count: bestDealsCountries.length})
    
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

//Create best deals countries
bestDealsCountriesRouter.put("/admin/best-deals", adminAuth, async(req,res) => {
  try{

    const validatedData = validateAndFormatDestination(req.body, true); //create = true

    const bestDealsCountry = await BestDealsCountries.create(validatedData)

    res.json({message: "Created best deal Country", bestDealsCountry})
    
  }catch(err){
    if(err.code === 11000 ){
      return res.status(409).json({message: "Destination with this slug already exists"})
    }
    res.status(500).json({ success: false, message: err.message})
  }
})

module.exports = bestDealsCountriesRouter;
