const mongoose = require("mongoose");

const sectionItemSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
      title: String,
      description: String,
      image: String,

    // for sections like iconic_sights, food, travel_tips, etc.
    items: [sectionItemSchema],
  },
  { _id: false }
);

const popularDestinationSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    countryName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    img: String,
    headerImg: String,
    // discount: String,
    // discountValue: Number,
    // price: String,
    // priceValue: Number,


    sections: [sectionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PopularDestination",
  popularDestinationSchema
);
