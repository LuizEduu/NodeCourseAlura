class UserDao {
  constructor(db) {
    this._db = db;
  }

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      this._db.get(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        }
      );
    });
  }
}

module.exports = UserDao;
