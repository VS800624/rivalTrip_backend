require("dotenv").config()
const mongoose = require("mongoose")
const connectDB = require("../config/database")
const PopularDestination = require("../models/popularDestination")
const data = require("../utils/popularCountries.json")

const seedData = async() => {
  try{
    await connectDB()
    console.log("Database Connected")

    await PopularDestination.deleteMany()
    await PopularDestination.insertMany(data)
    console.log("Data Added Successfully")
  } catch(error){
    console.log("Seeding failed: ", error)
    process.exit(1)       // error exit
  } finally{
    await mongoose.connection.close()
    process.exit(0)        // successful exit
  }
}

seedData()