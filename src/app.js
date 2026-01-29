require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./config/database")
const popularDestinationsRouter = require("./routes/popularDestination")
const bestDealsCountriesRouter = require("./routes/bestDealsCountries")
const businessClassCountriesRouter = require("./routes/businessClassCountires")
const destinationsSlugRouter = require("./routes/getDestinationsBySlug")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth")

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
app.use(cookieParser())


app.use("/api", popularDestinationsRouter)
app.use("/api", bestDealsCountriesRouter)
app.use("/api", businessClassCountriesRouter)
app.use("/api", destinationsSlugRouter)
app.use("/api", authRouter)

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