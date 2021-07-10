class BookDao {
  constructor(db) {
    this._db = db;
  }

  add(title, price, description) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
        INSERT INTO livros(
          titulo,
          preco,
          descricao
        ) VALUES (?,?,?)
      `,
        [title, price, description],
        (err) => {
          if (err) {
            reject(err);
          }

          resolve();
        }
      );
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this._db.get("SELECT * FROM livros WHERE id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  update(book) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
      UPDATE livros SET titulo = ?,
      preco = ?,
      descricao = ?
      WHERE id = ?
      `,
        [book.titulo, book.preco, book.descricao, book.id],
        (err) => {
          if (err) {
            reject(err);
          }

          resolve();
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this._db.run("DELETE FROM livros WHERE id = ?", [id], (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }

  listAll() {
    return new Promise((resolve, reject) => {
      this._db.all("SELECT * FROM livros", (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }
}

module.exports = BookDao;
