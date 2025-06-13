import RouterHelper from "../../helpers/router.helper.js";
import productControllers from "../../controllers/products.controller.js";
import passportCb from "../../middlewars/passportCb.mid.js";

class ProductsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], productControllers.createOne);
    this.read("/", ["PUBLIC"], productControllers.readAll);
    this.read("/:id", ["PUBLIC"], productControllers.readById);
    this.update("/:id", ["ADMIN"], productControllers.updateById);
    this.destroy("/:id", ["ADMIN"], productControllers.destroyById);
  };
}

const productRouter = new ProductsRouter().getRouter();
export default productRouter;
