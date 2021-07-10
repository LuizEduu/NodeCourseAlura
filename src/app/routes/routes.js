const db = require("../../config/database");
const BookDao = require("../infra/BookDao");

const express = require("express");
const routes = express.Router();
const path = require("path");

const viewsPath = path.resolve(__dirname, "..", "views");

routes.get("/", (req, res) => {
  res.render(`${viewsPath}/home/home.ejs`);
});

routes.get("/books", (req, res) => {
  const bookDao = new BookDao(db);

  bookDao
    .listAll()
    .then((books) => {
      res.render(`${viewsPath}/books/list.ejs`, {
        books,
      });
    })
    .catch((err) => console.log(err));
});

routes.get("/books/form/:id", (req, res) => {
  const { id } = req.params;

  new BookDao(db).findById(id).then((result) => {
    return res.render(`${viewsPath}/form/edit.ejs`, {
      book: result ? result : (book = {}),
    });
  });
});

routes.post("/livros", (req, res) => {
  const { titulo, preco, descricao } = req.body;

  const bookDao = new BookDao(db);

  bookDao
    .add(titulo, preco, descricao)
    .then(() => {
      return res.redirect("/books");
    })
    .catch((err) => console.log(err));
});

routes.delete("/livros/:id", (req, res) => {
  const { id } = req.params;

  const bookDao = new BookDao(db);
  bookDao
    .delete(id)
    .then(() => res.status(200).end())
    .catch((err) => console.log(err));
});

routes.put("/livros", (req, res) => {
  const { id, titulo, preco, descricao } = req.body;

  new BookDao(db)
    .findById(id)
    .then((book) => {
      const updatedBook = {
        id,
        titulo: titulo ? titulo : book.titulo,
        preco: preco ? preco : book.preco,
        descricao: descricao ? descricao : book.descricao,
      };

      bookDao.update(updatedBook).then(() => res.redirect("/books"));
    })
    .catch((err) => console.log(err));
});

module.exports = routes;
