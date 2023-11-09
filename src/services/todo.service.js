import { prisma } from "../prisma/index.js";

class TodoService {
    create = async (input, userId) => {
        const task = await prisma.task.create({
            data: {
                ...input,
                userId: userId
            },
            select: {
                title: true,
                description: true,
                dueDate: true,
                status: true,
                id: true
            }
        });

        return task;
    };
}

export const todoService = new TodoService();
