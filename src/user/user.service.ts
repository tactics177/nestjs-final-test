import { Injectable, NotImplementedException, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async addUser(email: string): Promise<User> {
        if (!email || !this.isValidEmail(email)) {
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

    async getUser(email: string): Promise<User | null> {
        if (!email || !this.isValidEmail(email)) {
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

    async resetData(): Promise<void> {
        try {
            await this.prisma.user.deleteMany({});
        } catch (error) {
            throw new Error('Failed to reset user data');
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
