import { todoService } from "../services/todo.service.js";
import { catchAsync } from "../errors/catchAsync.js";
import { CustomError } from "../errors/customError.js";

class TodoController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;

        const input = {
            title: body.title,
            description: body.description,
            dueDate: body.dueDate
        };

        if (!input.title || !input.description || !input.dueDate) {
            throw new CustomError(
                "Title, Description and Due Date are required",
                400
            );
        }

        const task = await todoService.create(input, userId);

        res.status(201).json({
            data: task
        });
    });
}

export const todoController = new TodoController();
