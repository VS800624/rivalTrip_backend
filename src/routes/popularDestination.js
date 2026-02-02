const express = require("express");
const PopularDestination = require("../models/popularDestination");
const adminAuth = require("../middleware/auth");
const popularDestinationsRouter = express.Router();

// Get Popular Destinations
popularDestinationsRouter.get("/popular-destinations", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0 
    const popularCountries = await PopularDestination.find({}).sort({
      countryName: 1,
    }).limit(limit);
    
    res
      .status(200)
      .json({
        success: true,
        message: "Fetched popular countries data successfully",
        popularCountries,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



module.exports = popularDestinationsRouter;
