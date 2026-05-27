import { Router } from "express";

import { apiGeneralLimiter } from "../middlewares/rate-limiter.middleware.ts";
import appRouter from "./app.routes.ts";
import authRouter from "./auth.routes.ts";
import examineeRouter from "./examinee.routes.ts";
import examinerRouter from "./examiner.routes.ts";

const rootRouter = Router();

rootRouter.use(apiGeneralLimiter);

rootRouter.use('/app', appRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/examinee', examineeRouter);
rootRouter.use('/examiner', examinerRouter);

export default rootRouter;