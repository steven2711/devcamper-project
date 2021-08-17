const dotenv = require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Body parser //
app.use(express.json());

// Dev logging middleware //
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Connect to database //
connectDB();

// Route files //
const bootcamps = require("./routes/bootcamps");

// Mount routers //
app.use("/api/v1/bootcamps", bootcamps);

// Error handling
app.use(errorHandler);

// Server //
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server and exit process.
  server.close(() => process.exit(1));
});
