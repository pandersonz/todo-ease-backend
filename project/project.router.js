"use strict";
const { Router } = require("express");
const {
  getProjects,
  createProject,
  assignProject,
} = require("./project.controller.js");
const { withToken } = require("../middleware/withToken");

//---------------------------------------------------
//            ROUTER FOR: /api/project/
//---------------------------------------------------

const ProjectRouter = Router();
ProjectRouter.get("/all", withToken, getProjects);
ProjectRouter.post("/create", withToken, createProject);
ProjectRouter.post("/assign", withToken, assignProject);

module.exports = ProjectRouter;
