const db = require("../../config/database");
const BookDao = require("../infra/BookDao");
const { validationResult } = require("express-validator");
const templates = require("../views/templates");

class BookController {
  constructor() {
    this._bookDao = new BookDao(db);
  }

  listAll(req, res) {
    this._bookDao
      .listAll()
      .then((books) => {
        res.render(templates.books.listAll, {
          books,
        });
      })
      .catch((err) => console.log(err));
  }

  add(req, res) {
    const { titulo, preco, descricao } = req.body;
    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).render(templates.books.addForm, {
        errors: errorsValidation.array(),
      });
    }

    this._bookDao
      .add(titulo, preco, descricao)
      .then(() => {
        return res.redirect("/books");
      })
      .catch((err) => console.log(err));
  }

  getFormUpdate(req, res) {
    const { id } = req.params;

    this._bookDao.findById(id).then((result) => {
      return res.render(templates.books.getFormUpdate, {
        book: result ? result : (book = {}),
      });
    });
  }

  details(req, res) {
    const { id } = req.params;

    this._bookDao
      .findById(id)
      .then((book) =>
        res.render(templates.books.details, {
          book,
        })
      )
      .catch((err) => console.log(err));
  }

  update(req, res) {
    const { id, titulo, preco, descricao } = req.body;

    let updatedBook = {};

    this._bookDao.findById(id).then((book) => {
      updatedBook = {
        id,
        titulo: titulo ? titulo : book.titulo,
        preco: preco ? preco : book.preco,
        descricao: descricao ? descricao : book.descricao,
      };
    });

    this._bookDao
      .update(updatedBook)
      .then(() => res.redirect("/books"))
      .catch((err) => err);
  }

  delete(req, res) {
    const { id } = req.params;

    this._bookDao
      .delete(id)
      .then(() => res.status(200).end())
      .catch((err) => err);
  }
}

module.exports = BookController;
