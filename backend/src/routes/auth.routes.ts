import { Router, type Request, type Response } from "express";

const authRouter = Router();

authRouter.post('/signup', (req: Request, res: Response) => {
    res.status(201).json({
        "message": "Created"
    })
});

authRouter.post('/signin', (req: Request, res: Response) => {
    res.status(200).json({
        "message": "Success"
    })
});

export default authRouter;