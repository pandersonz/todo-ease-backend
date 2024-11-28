"use strict";
const { Router } = require("express");
const { getUsers } = require("./user.controller.js");
const { withToken } = require("../middleware/withToken");
//---------------------------------------------------
//            ROUTER FOR: /api/user/
//---------------------------------------------------

const UserRouter = Router();
UserRouter.get("/all", withToken, getUsers);

module.exports = UserRouter;
