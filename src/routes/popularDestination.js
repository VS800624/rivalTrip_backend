const express = require("express");
const PopularDestination = require("../models/popularDestination");
const adminAuth = require("../middleware/auth");
const { validateAndFormatDestination } = require("../utils/validation");
const { default: mongoose } = require("mongoose");
const popularDestinationsRouter = express.Router();

// Get Popular Destinations public
popularDestinationsRouter.get("/popular-destinations", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const popularCountries = await PopularDestination.find({})
      .sort({
        countryName: 1,
      })
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Fetched popular countries data successfully",
      popularCountries,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all popular destination (Admin)
popularDestinationsRouter.get(
  "/admin/popular-destinations",
  // adminAuth,
  async (req, res) => {
    try {
      const popularDestination = await PopularDestination.find({}).sort({
        createdAt: -1,
      });
      res.json({
        message: "Fetched popular countries successfully",
        count: popularDestination.length,
        popularDestination,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
);

// Get destination by id
popularDestinationsRouter.get("/admin/popular-destination/:id", 
  // adminAuth,
  async(req,res) => {
    try{
      // Check if ID is valid
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

       // Find destination
      const popularDestination = await PopularDestination.findById(req.params.id)

      // If not found
      if(!popularDestination){
        return res.status(404).json({message: "Popular destination not found"})
      }

      res.json({message: "Fetched popular destination successfully", popularDestination})

    } catch(err){
      res.status(500).json({ success: false ,message: err.message})
    }
  }
)

// Create popular destination
popularDestinationsRouter.put(
  "/admin/popular-destination",
  // adminAuth,
  async (req, res) => {
    try {
      const validatedData = validateAndFormatDestination(req.body, true); //create = true

      const popularDestination = await PopularDestination.create(validatedData);

      // or
      //     const dest = new PopularDestination({
      //   slug,
      //   countryName,
      //   city,
      //   img,
      //   headerImg,
      //   discount,
      //   price,
      //   sections
      // });

      // dest.slug = dest.slug.toLowerCase();
      // const savedDest = await dest.save();

      res
        .status(201)
        .json({ message: "Created popular destination", popularDestination });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({
          message: "Destination with this slug already exists",
        });
      }
      res.status(500).json({ success: false, message: err.message });
    }
  },
);

// Update popular destination
popularDestinationsRouter.put(
  "/admin/popular-destination/:id",
  // adminAuth,
  async (req, res) => {
    try {
      // const loggedInAdmin = req.user

      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const allowedFields = [
        "slug",
        "countryName",
        "city",
        "img",
        "headerImg",
        "discount",
        "price",
        "sections",
      ];

      const updates = {};

      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      });

      const validatedUpdates = validateAndFormatDestination(updates);

      const updated = await PopularDestination.findByIdAndUpdate(
        req.params.id,
        validatedUpdates,
        { new: true, runValidators: true },
      );

      if (!updated) {
        return res
          .status(404)
          .json({ message: "Popular destination not found" });
      }

      res.json({
        message: "Updated popular destination successfully",
        updated,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
);

// Delete popular destination
popularDestinationsRouter.delete(
  "/admin/popular-destination/:id",
  // adminAuth,
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const deletedDestination = await PopularDestination.findByIdAndDelete(
        req.params.id,
      );

      if (!deletedDestination) {
        return res.status(404).json({
          message: "Destination not found",
        });
      }

      res.json({
        message: "Popular destination deleted successfully",
        deletedDestination,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

module.exports = popularDestinationsRouter;
