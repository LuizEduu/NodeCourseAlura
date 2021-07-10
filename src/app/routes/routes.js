const db = require("../../config/database");
const BookDao = require("../infra/BookDao");

const express = require("express");
const routes = express.Router();
const path = require("path");
const { body, validationResult } = require("express-validator");

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

routes.get("/books/form", (req, res) => {

  return res.render(`${viewsPath}/form/form.ejs`, {
    errors: []
  });
});

routes.get("/books/form/:id", (req, res) => {
  const { id } = req.params;

  new BookDao(db).findById(id).then((result) => {
    return res.render(`${viewsPath}/form/edit.ejs`, {
      book: result ? result : (book = {}),
    });
  });
});

routes.post(
  "/livros",
  [body("titulo").isLength({ min: 5 })
   .withMessage("O título precisa ter no mínimo 5 caracteres"),
   body("preco").isCurrency()
   .withMessage("O preço precisa ter um valor monetário válido")],
  (req, res) => {
    const { titulo, preco, descricao } = req.body;

    const errorsValidation = validationResult(req);



    
    if (!errorsValidation.isEmpty()) {
      return res.status(400).render(`${viewsPath}/form/form.ejs`, {
        errors: errorsValidation.array()
      });
    }
    const bookDao = new BookDao(db);

    bookDao
      .add(titulo, preco, descricao)
      .then(() => {
        return res.redirect("/books");
      })
      .catch((err) => console.log(err));
  }
);

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
  const bookDao = new BookDao(db);

  bookDao
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
