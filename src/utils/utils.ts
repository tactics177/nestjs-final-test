import { ObjectId } from "mongodb";

export class Utils {
    /**
     * Checks if the given email is valid.
     * @param email - The email to validate.
     * @returns True if the email is valid, false otherwise.
     */
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Checks if the given value is a valid priority.
     * @param value - The value to validate.
     * @returns True if the value is a valid priority, false otherwise.
     */
    static isValidPriority(value: number): boolean {
        return Number.isInteger(value) && value > 0;
    }

    /**
     * Checks if the given task name is valid.
     * @param name - The task name to validate.
     * @returns True if the task name is valid, false otherwise.
     */
    static isValidTaskName(name: string): boolean {
        return typeof name === 'string' && name.trim().length > 0;
    }
    
    /**
     * Checks if the given user ID is valid.
     * @param userId - The user ID to validate.
     * @returns True if the user ID is valid, false otherwise.
     */
    static isValidUserId(userId: string): boolean {
        return ObjectId.isValid(userId);
    } 
}
