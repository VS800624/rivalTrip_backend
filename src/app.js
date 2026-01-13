require("dotenv").config()
const express = require("express")
const app = express()
const connectDB = require("./config/database")


connectDB()
  .then(() => {
    console.log("Database connection established")
    app.listen(process.env.PORT, () => {
      console.log("Server is successfully on port 3000... ")
    })
  })
  .catch((err) => {
    console.error("Database cannot be connected")
  })


  // Note: Order of writing the code matters a lot