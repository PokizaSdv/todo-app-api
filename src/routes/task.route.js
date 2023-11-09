import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { taskController } from "../controllers/task.controller.js";

const taskRouter = Router();

taskRouter.post("/", userMiddleware.authenticate, taskController.create);
taskRouter.get("/:id", userMiddleware.authenticate, taskController.getTask);
taskRouter.patch("/:id", userMiddleware.authenticate, taskController.updateTask);


export { taskRouter };