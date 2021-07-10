const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const path = require("path");

const viewsPath = path.resolve(__dirname, "..", "views");

const app = express();

app.use("/static", express.static("src/app/public")); //configuração para arquivos estáticos

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(methodOverride("_method"));


app.use(routes);

module.exports = app;
