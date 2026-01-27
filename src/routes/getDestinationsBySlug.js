const express = require("express")
const PopularDestination = require("../models/popularDestination")
const BestDealsCountries = require("../models/bestDealsCountries")
const BusinessClassCountries = require("../models/businessClassCountries")
const destinationsSlugRouter = express.Router()

destinationsSlugRouter.get("/:slug", async(req,res) => {
  try{

    const {slug} = req.params

    // Finding ONE destination by slug, no matter which collection it is in
    // Run all three database queries at the SAME time, not one by one.
    const [popular, bestDeal, businessClass] = await Promise.all([
      PopularDestination.findOne({slug}),
      BestDealsCountries.findOne({slug}),
      BusinessClassCountries.findOne({slug})
    ])

    // const destination = await PopularDestination.findOne({slug})
    const destination = popular || bestDeal || businessClass;

    
    if (!destination){
      return res.status(400).json({success:false, message: "Destination not found"})
    }
    
    res.status(200).json({success: true,message: "Successfully fetched destinations" , destination})
    
  } catch(err){
    res.status(500).json({success: false, message: err.message})
  }
})

module.exports = destinationsSlugRouter

// We query multiple collections in parallel using Promise.all. Each query may return a document or null. We then select the first truthy result using logical OR, ensuring fast and clean lookup across collections.