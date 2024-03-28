import {
    Injectable,
    BadRequestException,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { Utils } from '../utils/utils';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    /**
     * Adds a new user with the specified email address.
     * @param email - The email address of the user.
     * @returns A Promise that resolves to the created User object.
     * @throws BadRequestException if the email address is invalid.
     * @throws ConflictException if a user with the same email address already exists.
     */
    async addUser(email: string): Promise<User> {
        if (!email || !Utils.isValidEmail(email)) {
            throw new BadRequestException('Invalid email address');
        }

        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        return this.prisma.user.create({
            data: {
                email,
            },
        });
    }

    /**
     * Retrieves the user with the specified email address.
     * @param email - The email address of the user.
     * @returns A Promise that resolves to the User object if found, or null if not found.
     * @throws BadRequestException if the email address is invalid.
     * @throws NotFoundException if the user with the specified email address is not found.
     */
    async getUser(email: string): Promise<User | null> {
        if (!email || !Utils.isValidEmail(email)) {
            throw new BadRequestException('Invalid email address');
        }

        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    /**
     * Resets the user data by deleting all users.
     * @returns A Promise that resolves to void.
     * @throws Error if failed to reset user data.
     */
    async resetData(): Promise<void> {
        try {
            await this.prisma.user.deleteMany({});
        } catch (error) {
            throw new Error('Failed to reset user data');
        }
    }
}
