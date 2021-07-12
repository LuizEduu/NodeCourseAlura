const BookController = require("../controllers/BookController");

const express = require("express");
const routes = express.Router();
const Book = require("../models/Book");
const templates = require("../views/templates");

const bookController = new BookController();

routes.get("/", (req, res) => bookController.listAll(req, res));

routes.get("/form", (req, res) =>
  res.render(templates.books.addForm, {
    errors: [],
  })
);
routes.get("/form/:id", (req, res) => bookController.getFormUpdate(req, res));
routes.get("/details/:id", (req, res) => bookController.details(req, res));

routes.post("/", Book.validations(), (req, res) =>
  bookController.add(req, res)
);
routes.put("/", (req, res) => bookController.update(req, res));
routes.delete("/:id", (req, res) => bookController.delete(req, res));

module.exports = routes;
