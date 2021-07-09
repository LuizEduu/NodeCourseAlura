
const express = require("express");
const routes = require("./routes");

const app = express();


app.set("view engine", "ejs")

app.use(routes);

module.exports = app;
