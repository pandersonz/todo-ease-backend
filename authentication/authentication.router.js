"use strict";
const { Router } = require("express");
const { login } = require("./authentication.controller.js");
//---------------------------------------------------
//            ROUTER FOR: /api/login/
//---------------------------------------------------

const AuthenticationRouter = Router();
AuthenticationRouter.post("/login", login);

module.exports = AuthenticationRouter;
