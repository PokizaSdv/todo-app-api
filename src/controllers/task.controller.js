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

    updateTask = catchAsync(async (req, res) => {
        const { body, params, userId } = req;
        const update = {};

        if (body.title) {
            update.title = body.title;
        }
        if (body.description) {
            update.description = body.description;
        }
        if (body.dueDate) {
            update.dueDate = body.dueDate;
        }

        if (!update.title && !update.description && !update.dueDate) {
            throw new CustomError("No update data provided", 400);
        }

        await taskService.updateTask(params.id, userId, update);
        res.status(204).send();
    });
}

export const taskController = new TaskController();
