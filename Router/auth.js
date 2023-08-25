const express = require("express");
const Auth = require("../Controller/auth");
const route = express.Router();

route.post("/auth/login", Auth.login);
route.post("/auth/signup", Auth.signup);

module.exports = route;



