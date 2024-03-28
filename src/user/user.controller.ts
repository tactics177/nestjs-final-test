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

    /**
     * Sign up a new user.
     * @param userData - The user data including the email.
     * @returns A promise that resolves to the created user model.
     */
    @Post('/')
    async signupUser(
        @Body() userData: {
            email: string
        },
    ): Promise<UserModel> {
        return this.userService.addUser(userData.email);
    }

    /**
     * Get a user by email.
     * @param email - The email of the user to retrieve.
     * @returns A promise that resolves to the user model if found, otherwise null.
     */
    @Get('/:email')
    async getUser(
        @Param('email') email: string,
    ): Promise<UserModel | null> {
        return this.userService.getUser(email);
    }
}
