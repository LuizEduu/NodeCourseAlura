const express = require("express");
const booksRouter = require("./books.router");
const homeRouter = require("./home.router");
const loginRouter = require("./login.router");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const sessionAuthentication = require("../../config/SessionAuthentication");

const app = express();
app.use("/static", express.static("src/app/public")); //configuração para arquivos estáticos
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
sessionAuthentication(app);

app.use("/books*", (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }

  next();
});

app.use("/books", booksRouter);
app.use("/home", homeRouter);
app.use("/login", loginRouter);

app.use((error, req, res, next) => {
  if (error) {
    throw new Error(error.message);
  }

  next();
});

module.exports = app;
