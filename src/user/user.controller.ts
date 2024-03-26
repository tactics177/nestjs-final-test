import {
    Controller,
    Get,
    Param,
    Post,
    Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('/')
    async signupUser(
        @Body() userData: {
            email: string
        },
    ): Promise<UserModel> {
        return this.userService.addUser(userData.email);
    }

    @Get('/:email')
    async getUser(
        @Param('email') email: string,
    ): Promise<UserModel | null> {
        return this.userService.getUser(email);
    }
}
