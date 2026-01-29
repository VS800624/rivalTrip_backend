const express = require("express");
const BestDealsCountries = require("../models/bestDealsCountries");
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

module.exports = bestDealsCountriesRouter;
