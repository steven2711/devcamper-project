const dotenv = require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("it fucking works");
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
