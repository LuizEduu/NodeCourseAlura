const db = require("../../config/database");
const BookDao = require("../infra/BookDao");

const express = require("express");
const routes = express.Router();
const path = require("path");

const viewsPath = path.resolve(__dirname, "..", "views");

routes.get("/", (req, res) => {
  res.send("olá");
});

routes.get("/books", (req, res) => {
  const bookDao = new BookDao(db);

  bookDao.listAll((err, result) => {
    res.render(`${viewsPath}/books/list.ejs`, {
      books: result,
    });
  });
});

module.exports = routes;
