import RouterHelper from "../helpers/router.helper.js";
import usersRouter from "./api/user.router.js";
import productsRouter from "./api/product.router.js";
import cartsRouter from "./api/carts.router.js";
import cookiesRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./api/auth.router.js";
import sendEmail from "../helpers/sendEmail.helper.js";

class ApiRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/carts", cartsRouter);
    this.use("/cookies", cookiesRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/auth", authRouter);
    this.read("/send/:email", ["PUBLIC"], async (req, res) => {
      const { email } = req.params;
      await sendEmail(email);
      res.json200({ sent: true });
    });
  };
}

const apiRouter = new ApiRouter().getRouter();
export default apiRouter;
