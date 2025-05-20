import { Router } from "express";

const cookiesRouter = Router();

const createCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "cookie creada";
    const data = { method, url, message };
    res
      .status(201)
      .cookie("user_id", "123456789", { maxAge: 7 * 24 * 60 * 60 * 1000 })
      .cookie("role", "admin", {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        signed: true,
      })
      .json(data);
  } catch (error) {
    next(error);
  }
};

const readCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "cookie leida: ";
    const cookies = { common: req.cookies, signed: req.signedCookies };
    const data = { method, url, message, cookies };
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const clearCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "cookie limpiada ";
    const data = { method, url, message };
    res.status(200).clearCookie("user_id").json(data);
  } catch (error) {
    next(error);
  }
};

cookiesRouter.get("/create", createCb);
cookiesRouter.get("/read", readCb);
cookiesRouter.get("/clear", clearCb);

export default cookiesRouter;
