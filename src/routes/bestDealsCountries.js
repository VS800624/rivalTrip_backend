const express = require("express")
const BestDealsCountries = require("../models/bestDealsCountries")
const bestDealsCountriesRouter = express.Router()

// Get best deals countries
bestDealsCountriesRouter.get("/best-deals", async(req,res) => {
  try {
    const bestDealsCountries = await BestDealsCountries.find({}) 
    res.status(200).json({message: "Fetched Best Deals Countries Data Successfully", bestDealsCountries})
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

module.exports = bestDealsCountriesRouter