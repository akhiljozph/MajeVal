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
    async (req: Request, res: Response) => {
        try {
            await appController.addCountry(req.body);

            res.status(200).json({
                "message": "Created"
            });
        } catch (error: any) {
            console.error(error);
            if (error.message === 'FOUND') {
                res.status(409).json({
                    "message": "Country exists!"
                })
            }

            res.status(400).json({
                "message": error.message
            })
        } finally {
            console.info('POST /api/v1/app/countries: Invokation completed');
        }
    }
);

export default appRouter;