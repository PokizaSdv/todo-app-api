import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { todoController } from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.post("/", userMiddleware.authenticate, todoController.create);


export { todoRouter };