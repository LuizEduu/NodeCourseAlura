const express = require("express");
const routes = express.Router();
const templates = require("../views/templates");

routes.get("/", (req, res) => res.render(templates.home.index));

module.exports = routes;
