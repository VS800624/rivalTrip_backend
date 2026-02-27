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
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")

// Setup cors
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://rivaltrip.netlify.app",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE",  "OPTIONS"],
    credentials: true,
  })
)

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "https://rivaltrip.netlify.app",
//   "http://127.0.0.1:5173",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, origin);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// // HANDLE PREFLIGHT EXPLICITLY
// app.options(/.*/, cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );



// parsing
app.use(express.json())
app.use(cookieParser())


app.use("/api", popularDestinationsRouter)
app.use("/api", bestDealsCountriesRouter)
app.use("/api", businessClassCountriesRouter)
app.use("/api", destinationsSlugRouter)
app.use("/api", authRouter)
app.use("/api", adminRouter)
app.use("/api", userRouter)

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