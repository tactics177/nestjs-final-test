import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task as TaskModel } from '.prisma/client';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    /**
     * Create a new task.
     * @param taskData - The data for the new task.
     * @returns A Promise that resolves to the created task.
     */
    @Post()
    async createTask(@Body() taskData: {
        name: string,
        userId: string,
        priority: number,
    }): Promise<TaskModel> {
        return this.taskService.addTask(taskData.name, taskData.userId, taskData.priority);
    }

    /**
     * Get a task by its name.
     * @param name - The name of the task.
     * @returns A Promise that resolves to the task with the specified name, or null if not found.
     */
    @Get(':name')
    async getTaskByName(@Param('name') name: string): Promise<TaskModel | null> {
        return this.taskService.getTaskByName(name);
    }

    /**
     * Get tasks for a specific user.
     * @param userId - The ID of the user.
     * @returns A Promise that resolves to the tasks associated with the specified user.
     */
    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string) {
        return this.taskService.getUserTasks(userId);
    }
}
