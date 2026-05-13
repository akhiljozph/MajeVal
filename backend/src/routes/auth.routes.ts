import { Router, type Request, type Response } from "express";
import { validate } from "../middlewares/validation.middleware.ts";
import { signupSchema } from "../schemas/auth.schema.ts";

const authRouter = Router();

authRouter.post('/signup',
    validate(signupSchema),
    (req: Request, res: Response) => {
        res.status(201).json({
            "message": "Created"
        })
    }
);

authRouter.post('/signin', (req: Request, res: Response) => {
    res.status(200).json({
        "message": "Success"
    })
});

export default authRouter;