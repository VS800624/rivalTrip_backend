const express = require("express")
const BestDealsCountries = require("../models/bestDealsCountries")
const bestDealsCountriesRouter = express.Router()

// Get best deals countries
bestDealsCountriesRouter.get("/best-deals", async(req,res) => {
  try {
    const bestDealsCountries = await BestDealsCountries.find({}) 
    res.json({message: "Fetched Best Deals Countries Data Successfully", bestDealsCountries})
  } catch(err){
    res.status(400).json({message: err.message})
  }
})

module.exports = bestDealsCountriesRouter