import { userService } from "../services/user.service.js";
import catchAsync from "../utils/catch-async.js";

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
        const companyInput = {
            name: body.company.name,
            position: body.company.position
        };
        await userService.signUp(userInput, companyInput);
        res.status(201).json({
            message: "Success"
        });
    });
}

export const userController = new UserController();
