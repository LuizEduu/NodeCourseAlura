const templates = require("../views/templates");
const BookController = require("./BookController");

class AuthenticationController {
  constructor() {
    this._bookController = new BookController();
  }

  login(req, res, next) {
    const passport = req.passport;

    passport.authenticate("local", (error, user, info) => {
      if (info) {
        return res.render(templates.login.index);
      }

      if (error) {
        return next(error);
      }

      req.login(user, (error) => {
        if (error) {
          return next(error);
        }

        return res.redirect("/books");
      });
    })(req, res, next);
  }
}

module.exports = AuthenticationController;
