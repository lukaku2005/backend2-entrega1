import RouterHelper from "../../helpers/router.helper.js";



const createCb = (req, res) => {
  const { method, originalUrl: url } = req;
  const message = "sesion creada ";
  const data = { method, url, message };
  req.session.role = "ADMIN";
  req.session.user_id = "abc";
  res.status(201).json(data);
};

const readCb = (req, res) => {
  const { method, originalUrl: url } = req;
  const message = "sesion leida ";
  const sessions = req.session;
  const data = { method, url, message, sessions };
  res.status(200).json(data);
};

const destroyCb = (req, res) => {
  const { method, originalUrl: url } = req;
  const message = "sesion destruida ";
  const data = { method, url, message };
  req.session.destroy();
  res.status(200).json(data);
};

class SessionRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/create", createCb);
    this.use("/read", readCb);
    this.use("/destroy", destroyCb);
  };
}

const sessionRouter = new SessionRouter().getRouter()
export default sessionRouter;
