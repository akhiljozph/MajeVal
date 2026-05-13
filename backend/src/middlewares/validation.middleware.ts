import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: 'Request failed',
                    errors: error.issues.map(e => ({ path: e.path[1], message: e.message }))
                });
            }

            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};