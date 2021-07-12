const { check } = require("express-validator");

class Book {
  static validations() {
    return [
      check("titulo")
        .isLength({ min: 5 })
        .withMessage("O título precisa ter no mínimo 5 caracteres"),
      check("preco")
        .isCurrency()
        .withMessage("O preço precisa ter um valor monetário válido"),
    ];
  }
}

module.exports = Book;
