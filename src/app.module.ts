import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { routes } from './app.routes';
import { RouterModule } from '@nestjs/core';

@Module({
    imports: [RouterModule.register(routes), AppRoutingModule, ConfigurationModule, DatabaseModule, TaskModule, UserModule],
    controllers: [UserController, TaskController],
    providers: [UserService, TaskService],
})
export class AppModule { }
