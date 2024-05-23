const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db.js");
const cors = require("cors");
require("dotenv").config();

// app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With , Content-Type ,Accept "
  );
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World from other side");
});
app.use(express.json());
app.use("/api", require("./Routes/CreateUser.js"));
app.use("/api", require("./Routes/DisplayData.js"));
app.use("/api", require("./Routes/OrderData.js"));
mongoDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
