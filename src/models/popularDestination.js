const mongoose = require("mongoose")

const popularDestinationSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  countryName: String,
  city: String,
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

module.exports = new mongoose.model("PopularDestination", popularDestinationSchema)