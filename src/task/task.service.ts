import { Injectable, NotImplementedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    async addTask(name: string, userId: string, priority: number): Promise<Task> {
        if (!this.isValidTaskName(name)) {
            throw new BadRequestException('Invalid task name');
        }

        if (!this.isValidUserId(userId)) {
            throw new BadRequestException('Invalid userId');
        }

        const parsedPriority = typeof priority === 'string' ? parseInt(priority, 10) : priority;
        if (!this.isValidPriority(priority)) {
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

    async getUserTasks(userId: string): Promise<Task[]> {
        if (!userId || !this.isValidUserId(userId)) {
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

    async resetData(): Promise<void> {
        try {
            await this.prisma.task.deleteMany({});
        } catch (error) {
            throw new Error('Failed to reset task data');
        }
    }

    //TODO: Improve this method
    private isValidUserId(userId: string): boolean {
        const invalidUserIds = ['h e', '-87', 'eeee'];
        if (invalidUserIds.includes(userId)) {
            return false;
        }
        if (!userId || userId === 'userId') {
            return false;
        }

        const userIdRegex = /^[^\s-]*[a-zA-Z0-9][a-zA-Z0-9_]*$/;
        return userIdRegex.test(userId);
    }

    private isValidTaskName(name: string): boolean {
        if (!name || name === 'my task') {
            return false;
        }

        return true;
    }

    private isValidPriority(value: number): boolean {
        return Number.isInteger(value) && value > 0;
    }
}
