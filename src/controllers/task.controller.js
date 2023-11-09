import { taskService } from "../services/task.service.js";
import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";

class TaskController {
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

        const task = await taskService.create(input, userId);

        res.status(201).json({
            data: task
        });
    });

    getTask = catchAsync(async (req, res) => {
        const { userId, params } = req;

        const task = await taskService.getTask(params.id, userId);

        res.status(200).json({
            data: task
        });
    });
}

export const taskController = new TaskController();
