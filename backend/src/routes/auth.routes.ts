import { Router, type Request, type Response } from "express";

import AuthController from "../controllers/auth.controller.ts";
import { container } from "../di-container.ts";
import { validate } from "../middlewares/validation.middleware.ts";
import { signupSchema } from "../schemas/auth.schema.ts";

const authRouter = Router();

const authController = container.get<AuthController>(AuthController);

authRouter.post('/signup',
    validate(signupSchema),
    async (req: Request, res: Response) => {
        try {
            await authController.addAccount(req.body);

            res.status(201).json({
                "message": "Created"
            });
        } catch (error: any) {
            console.error(error);
            res.status(400).json({
                "message": error.message
            })
        } finally {
            console.info('POST /api/v1/auth/signup: Invocation completed');
        }
    }
);

authRouter.post('/signin', (req: Request, res: Response) => {
    res.status(200).json({
        "message": "Success"
    })
});

export default authRouter;