const path = require("path");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const colors = require("colors");
const fileupload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Body parser //
app.use(express.json());

// Cookie parser //

app.use(cookieParser());

// Dev logging middleware //
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sanitize mongoDb (security)
app.use(mongoSanitize());

// Set security headers (security)
app.use(helmet());

// Prevent XSS attacks (security)
app.use(xss());

// Rate limiting (security)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});
app.use(limiter);

// Enable CORS

app.use(cors());

// Prevent http param pollution
app.use(hpp());

// Serve static files
app.use(express.static("public"));

// Connect to database //
connectDB();

// Route files //
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers //
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

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
