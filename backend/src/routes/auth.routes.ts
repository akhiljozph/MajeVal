import { Router, type Request, type Response } from "express";

import AuthController from "../controllers/auth.controller.ts";
import { container } from "../di-container.ts";
import { validate } from "../middlewares/validation.middleware.ts";
import { signinSchema, signupSchema } from "../schemas/auth.schema.ts";

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

authRouter.post('/signin',
    validate(signinSchema),
    async (req: Request, res: Response) => {
        try {
            const data = await authController.verifySignIn(req.body);

            res.status(200).json({
                "message": "Hurray, you're authenticated now. Welcome to the world of MajeVal.",
                data
            });
        } catch (error: any) {

            console.error(error);
            res.status(400).json({
                "message": error.message
            });
        } finally {
            console.info('POST /api/v1/auth/signin: Invocation completed');
        }
    }
);

authRouter.post('/refresh',
    async (req: Request, res: Response) => {
        try {
            const data = await authController.refreshSession(req);

            res.status(200).json({
                "message": "Hey, your session is refreshed. Please continue on your duties.",
                data
            });
        } catch (error: any) {
            console.error(error);
            res.status(400).json({
                "message": error.message
            });
        } finally {
            console.log('POST /api/v1/auth/refresh: Invocation completed');
        }
    }
);

export default authRouter;