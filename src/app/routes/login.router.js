const express = require("express");
const routes = express.Router();
const templates = require("../views/templates");
const AuthenticationController = require("../controllers/AuthenticationController");

const authenticationController = new AuthenticationController();

routes.get("/", (req, res) => res.render(templates.login.index));
routes.post("/", (req, res, next) =>
  authenticationController.login(req, res)
);

module.exports = routes;
