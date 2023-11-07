import { userService } from "../services/user.service.js";
import { catchAsync } from "../utils/catch-async.js";


class UserController {
    signUp = catchAsync(async (req, res) => {
        const { body } = req;

        const userInput = {
            email: body.email,
            preferredFirstName: body.preferredName,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password
        };
        
        await userService.signUp(userInput);
        
        res.status(201).json({
            message: "Success"
        });
    });

    signin = catchAsync(async (req, res) => {
        const { body } = req;
        const input = {
            email: body.email,
            password: body.password
        };

        const jwt = await userService.signin(input);
        res.status(200).json({
            token: jwt
        });
    });
}

export const userController = new UserController();
