import { Router, type Request, type Response } from "express";

import AuthController from "../controllers/auth.controller.ts";
import { container } from "../di-container.ts";
import { validate } from "../middlewares/validation.middleware.ts";
import { signinSchema, signupSchema } from "../schemas/auth.schema.ts";

const authRouter = Router();

const authController = container.get<AuthController>(AuthController);

/**
 * @openapi
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create a new account
 *     description: Registers a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Created
 *       400:
 *         description: Validation failed or account creation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
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

/**
 * @openapi
 * /api/v1/auth/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in to an existing account
 *     description: Authenticates a user and returns an access token. Sets an httpOnly refreshToken cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SigninRequest'
 *     responses:
 *       200:
 *         description: Authentication successful
 *         headers:
 *           Set-Cookie:
 *             description: httpOnly refreshToken cookie
 *             schema:
 *               type: string
 *               example: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Path=/; SameSite=Strict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hurray, you're authenticated now. Welcome to the world of MajeVal.
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     accountInfo:
 *                       $ref: '#/components/schemas/AccountInfo'
 *       400:
 *         description: Invalid credentials or sign-in failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
authRouter.post('/signin',
    validate(signinSchema),
    async (req: Request, res: Response) => {
        try {
            const { refreshToken, accessToken, accountInfo } = await authController.verifySignIn(req.body);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: Number(process.env.JWT_REFRESH_EXPIRES_IN)
            });

            res.status(200).json({
                "message": "Hurray, you're authenticated now. Welcome to the world of MajeVal.",
                data: {
                    accessToken,
                    accountInfo
                }
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

/**
 * @openapi
 * /api/v1/auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh access token
 *     description: Issues a new access token using the refreshToken cookie.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Session refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hey, your session is refreshed. Please continue on your duties.
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing or invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
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
