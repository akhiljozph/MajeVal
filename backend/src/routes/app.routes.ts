import { Router, type Request, type Response } from "express";

import AppController from "../controllers/app.controller.ts";
import { container } from "../di-container.ts";
import { validate } from "../middlewares/validation.middleware.ts";
import { countrySchema } from "../schemas/app.schema.ts";

const appRouter = Router();

const appController = container.get<AppController>(AppController);

appRouter.get('/countries',
    async (req: Request, res: Response) => {
        try {
            const countries = await appController.getCountries();
            console.log(countries);
            res.status(200).json({
                "message": "Success",
                "data": countries
            })
        } catch (error: any) {
            res.status(400).json({
                "message": error.message
            })
        } finally {
            console.info('GET /api/v1/app/countries: Invocation completed');
        }
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
            console.info('POST /api/v1/app/countries: Invocation completed');
        }
    }
);

export default appRouter;