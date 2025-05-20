import { Router } from "express";
import { userManager } from "../../data/manager.mongo.js";
import passport from "../../middlewars/passport.mid.js";
import { verifyToken } from "../../helpers/token.utils.js";
import passportCb from "../../middlewars/passportCb.mid.js";
const authRouter = Router();

const registerCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "registrado ";
    const data = { method, url, message };
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const loginCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "logeado ";
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true };
    const data = { method, url, message };
    const { user } = req;
    res.status(200).cookie("token", user.token, opts).json(data);
  } catch (error) {
    next(error);
  }
};

const signoutCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "sesion cerrada ";
    const data = { method, url, message };
    res.status(200).clearCookie("token").json(data);
  } catch (error) {
    next(error);
  }
};

const onlineCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { token } = req.signedCookies;
    const dataToken = verifyToken(token);
    let user = await userManager.readById(dataToken?._id);

    if (!user) {
      const error = new Error("credenciales invalidas");
      error.statusCode = 401;
      throw error;
    }
    const { password, __v, createdAt, updateAt, ...rest } = user;
    const data = {
      method,
      url,
      user: rest,
    };
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const badAuthCb = (req, res, next) => {
  try {
    const error = new Error("bad Auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};

const forbiddenCb = (req, res, next) => {
  try {
    const error = new Error("invalido");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};

authRouter.post("/register", passportCb("register"), registerCb);
authRouter.post("/login", passportCb("login"), loginCb);
authRouter.post("/signout", passportCb("user"), signoutCb);
authRouter.post("/online", passportCb("user"), onlineCb);
authRouter.get("/bad.auth", badAuthCb);
authRouter.get("/forbidden", forbiddenCb);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRouter.get("/google/redirect", passport.authenticate("google"), loginCb);

export default authRouter;
