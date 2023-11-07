import { prisma } from "../prisma/index.js";
import { crypto } from "../utils/crypto.js";
import { mailer } from "../utils/mailer.js";
import { bcrypt } from "../utils/bcrypt.js";

class UserService {
    signUp = async (userInput) => {
        const hashedPassword = await bcrypt.hash(userInput.password);

        await prisma.user.create({
            data: {
                ...userInput,
                password: hashedPassword
            },
            select: {
                id: true
            }
        });
    };
}

export const userService = new UserService();
