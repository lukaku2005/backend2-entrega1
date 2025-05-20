import { response, Router } from "express";
import { productManager } from "../../data/manager.mongo.js";
import passportCb from "../../middlewars/passportCb.mid.js";

const productRouter = Router();

const createOne = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await productManager.createOne(data);
    res.status(201).json({
      method: req.method,
      url: req.originalUrl,
      response: one,
    });
  } catch (error) {
    next(error);
  }
};

const readAll = async (req, res, next) => {
  try {
    const filter = req.query;
    const all = await productManager.readAll(filter);
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
  } catch (error) {
    next(error);
  }
};

const readById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await productManager.readById(id);
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
  } catch (error) {
    next(error);
  }
};

const destroyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await productManager.destroyById(id);
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
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const one = await productManager.updateById(id, data);
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
  } catch (error) {
    next(error);
  }
};


productRouter.post(
  "/",
  passportCb("admin"),
  createOne
);
productRouter.get("/", readAll);
productRouter.get("/:id", readById);
productRouter.put(
  "/:id",
  passportCb("admin"),
  updateById
);
productRouter.delete(
  "/:id",
  passportCb("admin"),
  destroyById
);

export default productRouter;
