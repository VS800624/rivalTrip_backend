const express = require("express");
const PopularDestination = require("../models/popularDestination");
const adminAuth = require("../middleware/auth");
const popularDestinationsRouter = express.Router();

// Get Popular Destinations public
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

// Get all popular destination (Admin)
popularDestinationsRouter.get("/admin/popular-destination", adminAuth, async(req,res) => {
  try{
    const popularDestination = await PopularDestination.find({}).sort({createdAt: -1})
    res.json({message: "Fetched popular countries successfully", count: popularDestination.length, popularDestination})
  } catch(err){
    res.status(500).json({ success: false, message: err.message });
  }
})

// Create popular destination 
popularDestinationsRouter.put("/admin/popular-destinations", adminAuth, async (req, res) => {
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

    // or 
    //     const dest = new PopularDestination({
    //   slug,
    //   countryName,
    //   city,
    //   img,
    //   headerImg,
    //   discount,
    //   discountValue,
    //   price,
    //   priceValue,
    //   sections
    // });

    // dest.slug = dest.slug.toLowerCase();
    // const savedDest = await dest.save();

    
    
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

// Update popular destination
popularDestinationsRouter.patch("/admin/popular-destination/:id", adminAuth, async(req,res) => {
  try{
    // const loggedInAdmin = req.user
   const allowedFields = [
    "slug",
    "countryName",
    "city",
    "img",
    "headerImg",
    "discount",
    "discountValue",
    "price",
    "priceValue",
    "sections"
  ];

  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

    // Normalize slug
    if (updates.slug) {
      updates.slug = updates.slug.trim().toLowerCase();
    }

  
    // Validate numbers
    if (updates.priceValue && isNaN(updates.priceValue)) {
      return res.status(400).json({
        success: false,
        message: "priceValue must be a number"
      });
    }

    if (updates.discountValue && isNaN(updates.discountValue)) {
      return res.status(400).json({
        success: false,
        message: "discountValue must be a number"
      });
    }

    // Convert to Number
    if (updates.priceValue !== undefined) {
      updates.priceValue = Number(updates.priceValue);
    }

    if (updates.discountValue !== undefined) {
      updates.discountValue = Number(updates.discountValue);
    }

    if (sections && !Array.isArray(sections)) {
        return res.status(400).json({
        success: false,
        message: "sections must be an array"
        });
      }

    const updated = await PopularDestination.findByIdAndUpdate(req.params.id, updates,{ new: true, runValidators: true})

    if(!updated){
      return res.status(404).json({message: "Popular destination not found"})
    }
  
    
    res.json({message: "Updated popular destination successfully", updated})
    
  }catch(err){
    res.status(500).json({ success: false, message: err.message });
  }
})


module.exports = popularDestinationsRouter;
