const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../public")));

app.use("/src", require("./assets"));
//PROJECT API ROUTES
app.use("/api", require("./api"));

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

//ERROR HANDLING FOR SERVER SIDE ISSUES
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json(err.message || "Internal Server Error. ❌ ");
});

module.exports = app;
