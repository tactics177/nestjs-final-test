import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task as TaskModel } from '.prisma/client';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    async createTask(@Body() taskData: {
        name: string,
        userId: string,
        priority: number,
    },): Promise<TaskModel> {
        return this.taskService.addTask(taskData.name, taskData.userId, taskData.priority);
    }

    @Get(':name')
    async getTaskByName(@Param('name') name: string): Promise<TaskModel | null> {
        return this.taskService.getTaskByName(name);
    }

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string) {
        return this.taskService.getUserTasks(userId);
    }
}
