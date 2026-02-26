const express = require("express");
const BestDealsCountries = require("../models/bestDealsCountries");
const adminAuth = require("../middleware/auth");
const { validateAndFormatDestination } = require("../utils/validation");
const { default: mongoose } = require("mongoose");
const bestDealsCountriesRouter = express.Router();

// Get best deals countries
bestDealsCountriesRouter.get("/best-deals", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const bestDealsCountries = await BestDealsCountries.find({})
      .sort({
        countryName: 1,
      })
      .limit(limit);
    res.status(200).json({
      success: true,
      message: "Fetched Best Deals Countries Data Successfully",
      bestDealsCountries,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get best deals countries (Admin)
bestDealsCountriesRouter.get(
  "/admin/best-deals",
  adminAuth,
  async (req, res) => {
    try {
      const bestDealsCountries = await BestDealsCountries.find({}).sort({
        createdAt: -1,
      });

      res
        .status(200)
        .json({
          success: true,
          message: "Fetched Best Deals Countries Data Successfully",
          bestDealsCountries,
          count: bestDealsCountries.length,
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

// Get best deals countries by id (Admin)
bestDealsCountriesRouter.get(
  "/admin/best-deals/:id",
  adminAuth,
  async (req, res) => {
    try {
      // Check if id is valid
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid Id" });
      }
      // Find country
      const bestDealsCountry = await BestDealsCountries.findById(
        req.params.id,
      );

      if (!bestDealsCountry) {
        return res
          .status(404)
          .json({ message: "Best deals country not found"});
      }

      res.json({
        message: "Fetched best deals country successfully",
        bestDealsCountry,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
);

//Create best deals countries
bestDealsCountriesRouter.post(
  "/admin/best-deals",
  adminAuth,
  async (req, res) => {
    try {
      const validatedData = validateAndFormatDestination(req.body, true); //create = true

      const bestDealsCountry = await BestDealsCountries.create(validatedData);

      res.json({
        message: "Created best deal country successfully",
        bestDealsCountry,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "Destination with this slug already exists" });
      }
      res.status(500).json({ success: false, message: err.message });
    }
  },
);

// Update best deals countries
bestDealsCountriesRouter.put(
  "/admin/best-deals/:id",
  adminAuth,
  async (req, res) => {
    try {
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
        "discountValue",
        "price",
        "priceValue",
        "sections",
      ];

      const updates = {};

      allowedFields.forEach((fields) => {
        if (req.body[fields] !== undefined) {
          updates[fields] = req.body[fields];
        }
      });

      const validatedUpdates = validateAndFormatDestination(updates);

      const updated = await BestDealsCountries.findByIdAndUpdate(
        req.params.id,
        validatedUpdates,
        { new: true, runValidators: true },
      );

      if (!updated) {
        return res
          .status(404)
          .json({ message: "Best deals country not found" });
      }

      res.json({ message: "Updated best deals country successfully", updated });
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "Destination with this slug already exists" });
      }
      res.status(500).json({ success: false, message: err.message });
    }
  },
);

// Delete best deals
bestDealsCountriesRouter.delete(
  "/admin/best-deals/:id",
  adminAuth,
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const deletedBestDealsCountry =
        await BestDealsCountries.findByIdAndDelete(req.params.id);

      if (!deletedBestDealsCountry) {
        return res
          .status(404)
          .json({ message: "Best deals country not found" });
      }

      res.json({
        message: "Deleted best deals country successfully",
        deletedBestDealsCountry,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
);

module.exports = bestDealsCountriesRouter;
