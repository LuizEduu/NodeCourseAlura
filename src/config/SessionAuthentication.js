const uuid = require("uuid");
const session = require("express-session");
const passport = require("passport");
const LocalStragegy = require("passport-local").Strategy; //criar uma estrategia local de autenticação
const UserDao = require("../app/infra/UserDao");
const db = require("../config/database");

module.exports = (app) => {
  passport.use(
    new LocalStragegy(
      {
        usernameField: "email",
        passwordField: "senha",
      },
      (email, senha, done) => {
        const userDao = new UserDao(db);
        userDao
          .findByEmail(email)
          .then((user) => {
            if (!user || senha != user.senha) {
              return done(null, false, {
                message: "Usuário ou senha incorretos",
              });
            }

            return done(null, user);
          })
          .catch((err) => done(err, false));
      }
    )
  );

  passport.serializeUser((user, done) => {
    const sessionUser = {
      name: user.nome_completo,
      email: user.email,
    };

    done(null, sessionUser);
  });

  passport.deserializeUser((sessionUser, done) => {
    done(null, sessionUser);
  });

  app.use(
    session({
      secret: "node alura",
      genid: () => {
        return uuid.v4();
      },
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function (req, res, next) {
    req.passport = passport;
    next();
  });
};
