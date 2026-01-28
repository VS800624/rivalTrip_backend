const express = require("express");
const BusinessClassCountries = require("../models/businessClassCountries");
const businessClassCountriesRouter = express.Router();

// get business class countries
businessClassCountriesRouter.get("/business-class", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0
    const businessClassCountries = await BusinessClassCountries.find({}).sort({
      countryName: 1,
    }).limit();
    res
      .status(200)
      .json({
        success: true,
        message: "Fetched Business Class Countries Successfully",
        businessClassCountries,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = businessClassCountriesRouter;
