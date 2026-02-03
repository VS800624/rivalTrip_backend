const mongoose = require("mongoose")

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

const businessClassCountriesSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique:true,
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
    discount: String,
    discountValue: Number,
    price: String,
    priceValue: Number,


    sections: [sectionSchema],
  }, {timestamps: true})

module.exports = mongoose.model("BusinessClassCountries", businessClassCountriesSchema)