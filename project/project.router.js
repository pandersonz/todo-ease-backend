"use strict";
const { Router } = require("express");
const { getProjects, createProject } = require("./project.controller.js");
const { withToken } = require("../middleware/withToken");

//---------------------------------------------------
//            ROUTER FOR: /api/project/
//---------------------------------------------------

const ProjectRouter = Router();
ProjectRouter.get("/all", withToken, getProjects);
ProjectRouter.post("/create", withToken, createProject);

module.exports = ProjectRouter;
