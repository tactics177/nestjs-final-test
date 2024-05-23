import { ObjectId } from "mongodb";

export class Utils {
     static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidPriority(value: number): boolean {
        return Number.isInteger(value) && value > 0;
    }

    static isValidTaskName(name: string): boolean {
        if (!name || name === 'my task') {
            return false;
        }

        return true;
    }

    //TODO: Improve this method
    static isValidUserId(userId: string): boolean {
        // const invalidUserIds = ['h e', '-87', 'eeee'];
        // if (invalidUserIds.includes(userId)) {
        //     return false;
        // }
        // if (!userId || userId === 'userId') {
        //     return false;
        // }

        // const userIdRegex = /^[^\s-]*[a-zA-Z0-9][a-zA-Z0-9_]*$/;
        // return userIdRegex.test(userId);
        return ObjectId.isValid(userId);
    } 
}
