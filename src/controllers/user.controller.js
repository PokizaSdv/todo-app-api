import { userService } from "../services/user.service.js";
import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";

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

    forgotPassword = catchAsync(async (req, res) => {
        const {
            body: { email }
        } = req;

        await userService.forgotPassword(email);
        res.status(200).json({
            message: "Password reset email has been sent"
        });
    });

    resetPassword = catchAsync(async(req, res) => {
        const {
            body: { password, passwordConfirm },
            headers
        } = req;

        if (!password || !passwordConfirm)
            throw new CustomError(
                "Password and Password Confirm is required",
                400
            );

        if (password !== passwordConfirm)
            throw new CustomError(
                "Password and Password Confirm does not match",
                400
            );

        if (!headers.authorization)
            throw new CustomError("Reset Token is missing", 400);

        const [bearer, token] = headers.authorization.split(" ");

        if (bearer !== "Bearer" || !token)
            throw new CustomError("Invalid Token", 400);

        await userService.resetPassword(token, password);
        res.status(200).json({
            message: "Password successfully updated"
        }); 
    })
}

export const userController = new UserController();
