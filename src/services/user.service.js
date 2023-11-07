import { prisma } from "../prisma/index.js";
import { crypto } from "../utils/crypto.js";
import { mailer } from "../utils/mailer.js";
import { bcrypt } from "../utils/bcrypt.js";


class UserService {
    signUp = async (userInput, companyInput) => {

        const hashedPassword = await bcrypt.hash(userInput.password);
        const activationToken = crypto.createToken();
        const hashedActivationToken = crypto.hash(activationToken);

        await prisma.user.create({
            data: {
                ...userInput,
                password: hashedPassword,
                activationToken: hashedActivationToken
            },
            select: {
                id: true,
            },
        });

        await PrismaClient.companyInput.create({
            data: {
                ...companyInput,
                userId: user.id
            }
        })
        await mailer.sendActivationMail(userInput.email, activationToken);
   
};
}

export const userService = new UserService();
