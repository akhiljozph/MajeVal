import { Router, type Request, type Response } from "express";

import AppController from "../controllers/app.controller.ts";
import { container } from "../di-container.ts";
import { validate } from "../middlewares/validation.middleware.ts";
import { countrySchema, emailQuerySchema } from "../schemas/app.schema.ts";

const appRouter = Router();

const appController = container.get<AppController>(AppController);

/**
 * @openapi
 * /api/v1/app/countries:
 *   get:
 *     tags:
 *       - App
 *     summary: Retrieve all available country informations
 *     description: Returns the full list of countries stored in the system.
 *     responses:
 *       200:
 *         description: A successful response matching the country list array.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: IND
 *                       countryCode:
 *                         type: string
 *                         example: "+91"
 *                       countryName:
 *                         type: string
 *                         example: India
 *       400:
 *         description: Failed to retrieve countries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */
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

            res.status(201).json({
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

appRouter.get('/check-email/:emailAddress',
    validate(emailQuerySchema),
    async (req: Request, res: Response) => {
        try {
            const { emailAddress } = req.params as { emailAddress: string };

            const result = await appController.checkEmailAvailability(emailAddress);

            res.status(200).json({
                isTaken: result
            });

        } catch (error: any) {
            res.status(400).json({
                "message": error.message
            })
        } finally {
            console.info('GET /api/v1/app/check-email/:emailAddress: Invocation completed');
        }
    }
);

export default appRouter;