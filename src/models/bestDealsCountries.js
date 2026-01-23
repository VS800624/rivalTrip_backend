const mongoose = require("mongoose")

const bestDealsCountriesSchema = new mongoose.Schema({

   slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  countryName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  img: String,
  headerImg: String,

  sections: [
    {
      title: String,
      description: String,
      image: String
    },
  ],

  iconicSights: [
    {
      name: String,
      description: String,
      image: String,
    },
  ],

  experiences: [String],

  foodItems: [
    {
      name: String,
      description: String,
      image: String,
    },
  ],

  travelTips: [String]

}, {timestamps: true})

const BestDealsCountries = new mongoose.model("BestDealsCountries", bestDealsCountriesSchema)
module.exports = BestDealsCountries