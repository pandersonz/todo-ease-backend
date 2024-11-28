"use strict";
const { Router } = require("express");
const { getProjectTasks } = require("./task.controller.js");
const { withToken } = require("../middleware/withToken");
//---------------------------------------------------
//            ROUTER FOR: /api/task/
//---------------------------------------------------

const TaskRouter = Router();
TaskRouter.get("/project/:projectId", withToken, getProjectTasks);

module.exports = TaskRouter;
