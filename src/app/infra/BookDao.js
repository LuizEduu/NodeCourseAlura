class BookDao {
  constructor(db) {
    this._db = db;
  }

  listAll(callback) {
    this._db.all("SELECT * FROM livros", (err, result) =>
      callback(err, result)
    );
  }
}

module.exports = BookDao;
