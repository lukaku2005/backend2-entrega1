import { Router } from "express";
import cartsRouter from "./api/carts.router.js";
import productRouter from "./api/product.router.js";
import userRouter from "./api/user.router.js";
import cookiesRouter from "./api/cookies.router.js";
import sessionRouter from "./api/sessions.routers.js";
import authRouter from "./api/auth.router.js";

const apiRouter = Router();
apiRouter.use("/users", userRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
