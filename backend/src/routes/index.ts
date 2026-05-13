import { Router } from "express";
import examinerRouter from "./examiner.routes.ts";
import examineeRouter from "./examinee.routes.ts";
import authRouter from "./auth.routes.ts";
import appRouter from "./app.routes.ts";

const rootRouter = Router();

rootRouter.use('/app', appRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/examinee', examineeRouter);
rootRouter.use('/examiner', examinerRouter);

export default rootRouter;