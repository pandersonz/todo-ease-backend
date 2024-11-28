"use strict";
const { Router } = require("express");
const { getProjects } = require("./project.controller.js");
const { withToken } = require("../middleware/withToken");

//---------------------------------------------------
//            ROUTER FOR: /api/project/
//---------------------------------------------------

const ProjectRouter = Router();
ProjectRouter.get("/all", withToken, getProjects);

module.exports = ProjectRouter;
