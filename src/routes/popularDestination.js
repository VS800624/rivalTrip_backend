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

// Create popular destination 
popularDestinationsRouter.post("/admin/popular-destinations", adminAuth, async (req, res) => {
  try{

    let {slug, countryName, city, img, headerImg, discount, discountValue, price, priceValue, sections } = req.body

    if(!slug || !countryName || !city){
      return res.status(400).json({message: "slug, countryName amd city are required"})
    }

      // Normalize slug
      slug = slug.trim().toLowerCase();
      if (price) price = price.trim();
      if (discount) discount = discount.trim();

      // Basic validations
      if (priceValue && isNaN(priceValue)) {
        return res.status(400).json({
          success: false,
          message: "priceValue must be a number"
        });
      }

      if (discountValue && isNaN(discountValue)) {
        return res.status(400).json({
          success: false,
          message: "discountValue must be a number"
        });
      }
      
      if (sections && !Array.isArray(sections)) {
        return res.status(400).json({
        success: false,
        message: "sections must be an array"
        });
      }

      // Convert to Number (recommended)
      priceValue = priceValue !== undefined ? Number(priceValue) : undefined;
      discountValue = discountValue !== undefined ? Number(discountValue) : undefined;
    
    const popularDestination = await PopularDestination.create({
      slug,
      countryName,
      city,
      img,
      headerImg, 
      discount,
      discountValue,
      price,
      priceValue,
      sections
    });


    
    res.status(201).json({message: "Created popular destination", popularDestination});
  } catch(err){
    if (err.code === 11000) {
    return res.status(409).json({
      message: "Destination with this slug already exists"
    });
  }
    res.status(500).json({ success: false, message: err.message });
  }
});




module.exports = popularDestinationsRouter;
