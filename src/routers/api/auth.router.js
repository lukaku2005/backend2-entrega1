import RouterHelper from "../../helpers/router.helper.js";
import { userManager } from "../../data/manager.mongo.js";
import passport from "../../middlewars/passport.mid.js";
import { verifyToken } from "../../helpers/token.utils.js";
import passportCb from "../../middlewars/passportCb.mid.js";

const registerCb = async (req, res) => res.json201(null, "registrado");

const loginCb = async (req, res) => {
  const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true };
  res.cookie("token", req.user.token, opts).json200(req.user._id, "logeado ");
};

const signoutCb = (req, res) =>
  res.clearCookie("token").json200(req.user._id, "sesion cerrada ");

const onlineCb = async (req, res) => {
  const { token } = req.signedCookies;
  const dataToken = verifyToken(token);
  let user = await userManager.readById(dataToken?._id);

  if (!user) {
    return res.json401("credenciales invalidas");
  }
  const { password, __v, createdAt, updateAt, ...rest } = user;
  res.json200(rest);
};

const badAuthCb = (req, res) => res.json401();

const forbiddenCb = (req, res) => res.json403();

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), registerCb);
    this.create("/login", ["PUBLIC"], passportCb("login"), loginCb);
    this.create("/signout", ["USER", "ADMIN"], passportCb("user"), signoutCb);
    this.create("/online", ["USER", "ADMIN"], passportCb("user"), onlineCb);
    this.read("/bad.auth", ["PUBLIC"], badAuthCb);
    this.read("/forbidden", ["PUBLIC"], forbiddenCb);
    this.read(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/redirect",
      ["PUBLIC"],
      passport.authenticate("google"),
      loginCb
    );
  };
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;
