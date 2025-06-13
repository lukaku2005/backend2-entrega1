import RouterHelper from "../../helpers/router.helper.js";

const createCb = (req, res) => {
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
};

const readCb = (req, res) => {
  const { method, originalUrl: url } = req;
  const message = "cookie leida: ";
  const cookies = { common: req.cookies, signed: req.signedCookies };
  const data = { method, url, message, cookies };
  res.status(200).json(data);
};

const clearCb = (req, res) => {
  const { method, originalUrl: url } = req;
  const message = "cookie limpiada ";
  const data = { method, url, message };
  res.status(200).clearCookie("user_id").json(data);
};

class CookiesRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/create", createCb);
    this.read("/read", readCb);
    this.read("/clear", clearCb);
  };
}

const cookiesRouter = new CookiesRouter().getRouter();
export default cookiesRouter;
