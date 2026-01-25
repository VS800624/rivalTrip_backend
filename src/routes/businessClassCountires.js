const express = require("express")
const BusinessClassCountries = require("../models/businessClassCountries")
const businessClassCountriesRouter = express.Router()

// get business class countries
businessClassCountriesRouter.get("/business-class", async(req,res) => {
  try{
    const businessClassCountries = await BusinessClassCountries.find({})
    res.status(200).json({message: "Fetched Business Class Countries Successfully", businessClassCountries})
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

module.exports = businessClassCountriesRouter