const express = require("express")
const PopularDestination = require("../models/popularDestination")
const popularDestinationsRouter = express.Router()

// Get Popular Destinations
popularDestinationsRouter.get("/popular-destinations", async(req,res) => {
  try {
    const popularCountries = await PopularDestination.find({})
    res.json({message: "Fetched popular countries data successfully" ,  popularCountries})
  } catch(err){
    res.status(400).json({message: err.message})
  }
})


module.exports = popularDestinationsRouter