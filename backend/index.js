const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./rout/userRout");

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://issue-check.vercel.app'
];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials such as cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// CORS middleware
app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests (preflight)
app.options("*", cors(corsOptions));

// Routers
app.use(userRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(process.env.PORT, () => {
  console.log("App running on port", process.env.PORT);
});
