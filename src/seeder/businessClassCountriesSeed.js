require("dotenv").config()
const mongoose = require("mongoose")
const connectDB = require("../config/database")
const data = require("../utils/businessClassCountries.json")
const BusinessClassCountries = require("../models/businessClassCountries")

const businessClassCountriesSeed = async() => {
  try{
    await connectDB()
    console.log("Database Connected")
    await BusinessClassCountries.deleteMany()
    await BusinessClassCountries.insertMany(data)
    console.log("Data added successful")
  }catch(err){
    console.log("Seeding Failed: ", err)
    process.exit(1)      // error exit
  } finally {
      await mongoose.connection.close()
      process.exit(0)        // successful exit
  }
}

businessClassCountriesSeed()
