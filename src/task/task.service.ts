import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task } from '@prisma/client';
import { Utils } from '../utils/utils';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    /**
     * Adds a new task.
     * @param name - The name of the task.
     * @param userId - The ID of the user associated with the task.
     * @param priority - The priority of the task.
     * @returns A Promise that resolves to the created task.
     * @throws BadRequestException if the task name, user ID, or priority is invalid.
     * @throws NotFoundException if the user is not found.
     */
    async addTask(name: string, userId: string, priority: number): Promise<Task> {
        if (!Utils.isValidTaskName(name)) {
            throw new BadRequestException('Invalid task name');
        }

        if (!Utils.isValidUserId(userId)) {
            throw new BadRequestException('Invalid userId');
        }

        const parsedPriority = typeof priority === 'string' ? parseInt(priority, 10) : priority;
        if (!Utils.isValidPriority(parsedPriority)) {
            throw new BadRequestException('Priority must be a positive integer');
        }

        const existingUser = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        return this.prisma.task.create({
            data: {
                name: name,
                priority: parsedPriority,
                userId: userId,
            },
        });
    }

    /**
     * Retrieves a task by its name.
     * @param name - The name of the task.
     * @returns A Promise that resolves to the task, or null if not found.
     */
    async getTaskByName(name: string): Promise<Task | null> {
        const task = await this.prisma.task.findFirst({
            where: {
                name: name,
            },
        });

        if (!task) {
            return null;
        }

        return task;
    }

    /**
     * Retrieves all tasks associated with a user.
     * @param userId - The ID of the user.
     * @returns A Promise that resolves to an array of tasks.
     * @throws BadRequestException if the user ID is invalid.
     * @throws NotFoundException if no tasks are found for the user.
     */
    async getUserTasks(userId: string): Promise<Task[]> {
        if (!userId || !Utils.isValidUserId(userId)) {
            throw new BadRequestException('Invalid userId');
        }

        const tasks = await this.prisma.task.findMany({
            where: {
                userId: userId,
            },
        });

        if (tasks.length === 0) {
            throw new NotFoundException('No tasks found for the user');
        }

        return tasks;
    }

    /**
     * Resets the task data.
     * @returns A Promise that resolves when the data is reset.
     * @throws Error if the task data reset fails.
     */
    async resetData(): Promise<void> {
        try {
            await this.prisma.task.deleteMany({});
        } catch (error) {
            throw new Error('Failed to reset task data');
        }
    }
}
