"use strict";
const { Router } = require("express");
const {
  getTasks,
  getProjectTasks,
  createTask,
  updateTask,
} = require("./task.controller.js");
const { withToken } = require("../middleware/withToken");
//---------------------------------------------------
//            ROUTER FOR: /api/task/
//---------------------------------------------------

const TaskRouter = Router();
TaskRouter.get("/all", withToken, getTasks);
TaskRouter.get("/project/:projectId", withToken, getProjectTasks);
TaskRouter.post("/create", withToken, createTask);
TaskRouter.post("/update", withToken, updateTask);

module.exports = TaskRouter;
