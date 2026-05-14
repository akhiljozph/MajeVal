import { Router, type Request, type Response } from "express";

import { validate } from "../middlewares/validation.middleware.ts";
import { countrySchema } from "../schemas/app.schema.ts";
import { container } from "../di-container.ts";
import AppController from "../controllers/app.controller.ts";

const appRouter = Router();

const appController = container.get<AppController>(AppController);

appRouter.get('/countries',
    (req: Request, res: Response) => {
        res.status(200).json({
            "message": "Created"
        })
    }
);

appRouter.post('/countries',
    validate(countrySchema),
    (req: Request, res: Response) => {
        appController.addCountry();
        res.status(200).json({
            "message": "Created"
        })
    }
);

export default appRouter;