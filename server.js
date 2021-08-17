const dotenv = require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./config/db");

// Dev logging middleware //
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Connect to database
connectDB();

// Route files //
const bootcamps = require("./routes/bootcamps");

// Mount routers //
app.use("/api/v1/bootcamps", bootcamps);

// Server //
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server and exit process.
  server.close(() => process.exit(1));
});
