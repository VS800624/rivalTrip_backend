require("dotenv").config()
const mongoose = require("mongoose")
const connectDB = require("../config/database")
const BestDealsCountries = require("../models/bestDealsCountries")
const data = require("../utils/bestDealsCountries.json")


const bestDealsCountriesSeed = async() => {
  try {
    await connectDB()
    console.log("Database Connected")
    await BestDealsCountries.deleteMany()
    await BestDealsCountries.insertMany(data)
    console.log("Data Added Successfully")
  }catch(err){
    console.log("Seeding Failed: ", err)
    process.exit(1)      // error exit
  } finally {
    await mongoose.connection.close()
    process.exit(0)        // successful exit
  }
}

bestDealsCountriesSeed()