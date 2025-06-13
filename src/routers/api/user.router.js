import RouterHelper from "../../helpers/router.helper.js";
import { userManager } from "../../data/manager.mongo.js";

const createOne = async (req, res) => {
    const data = req.body;
    const one = await userManager.createOne(data);
    res.status(201).json({
      method: req.method,
      url: req.originalUrl,
      response: one,
    });
};

const readAll = async (req, res) => {
  const filter = req.query;
    const all = await userManager.readAll(filter);
    if (all.length > 0) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: all,
      });
    } else {
      const error = new Error("no encontrado");
      error.statusCode = 404;
      throw error;
    }
};

const readById = async (req, res ) => {
  
    const { id } = req.params;
    const one = await userManager.readById(id);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("no encontrado");
      error.statusCode = 404;
      throw error;
    }
};

const destroyById = async (req, res) => {
  
    const { id } = req.params;
    const one = await userManager.destroyById(id);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("no encontrado");
      error.statusCode = 404;
      throw error;
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const one = await userManager.updateById(id, data);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("no encontrado");
      error.statusCode = 404;
      throw error;
    }
};

class UserRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", createOne);
    this.read("/", readAll);
    this.read("/:id", readById);
    this.update("/:id", updateById);
    this.delete("/:id", destroyById);
  };
}

const userRouter = new UserRouter().getRouter;
export default userRouter;
