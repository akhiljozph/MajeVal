import { Router, type Request, type Response } from "express";

const appRouter = Router();

appRouter.get('/countries',
    (req: Request, res: Response) => {
        res.status(200).json({
            "message": "Created"
        })
    }
);

export default appRouter;