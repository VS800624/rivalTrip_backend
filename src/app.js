require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./config/database")
const popularDestinationsRouter = require("./routes/popularDestination")
const bestDealsCountriesRouter = require("./routes/bestDealsCountries")
const businessClassCountriesRouter = require("./routes/businessClassCountires")

// Setup cors
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://rivaltrip.netlify.app/",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // credentials: true,
  })
)


// parsing
app.use(express.json())


app.use("/api", popularDestinationsRouter)
app.use("/api", bestDealsCountriesRouter)
app.use("/api", businessClassCountriesRouter)

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