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
 *     summary: Retrieve all available countries
 *     description: Returns the full list of countries stored in the system.
 *     responses:
 *       200:
 *         description: Countries retrieved successfully
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
 *                     $ref: '#/components/schemas/Country'
 *       400:
 *         description: Failed to retrieve countries
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
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

/**
 * @openapi
 * /api/v1/app/countries:
 *   post:
 *     tags:
 *       - App
 *     summary: Add a new country
 *     description: Creates a country entry. Returns 409 if the country already exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Country'
 *     responses:
 *       201:
 *         description: Country created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Created
 *       400:
 *         description: Invalid request or creation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *       409:
 *         description: Country already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Country exists!
 */
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

/**
 * @openapi
 * /api/v1/app/check-email/{emailAddress}:
 *   get:
 *     tags:
 *       - App
 *     summary: Check email availability
 *     description: Returns whether the given email address is already taken.
 *     parameters:
 *       - in: path
 *         name: emailAddress
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         example: jane@example.com
 *     responses:
 *       200:
 *         description: Email availability checked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isTaken:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Failed to check email availability
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
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
