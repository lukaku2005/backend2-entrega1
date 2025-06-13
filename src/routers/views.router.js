import RouterHelper from "../helpers/router.helper.js";
import productsRepository from "../repositories/products.repository.js";

const homeViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("index", { products });
};
const productViewCb = async (req, res) => {
  const { pid } = req.params;
  const product = await productsRepository.readById(pid);
  res.status(200).render("product", { product });
};
const registerViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("register", { products });
};
const loginViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("login", { products });
};
const profileViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("profile", { products });
};
const verifyViewCb = async (req, res) => {
  const { email } = req.params
  res.status(200).render("verify", { email });
};

class ViewsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/", ["PUBLIC"], homeViewCb);
    this.render("/product/:pid", ["PUBLIC"], productViewCb);
    this.render("/register", ["PUBLIC"], registerViewCb);
    this.render("/login", ["PUBLIC"], loginViewCb);
    this.render("/profile", ["USER", "ADMIN"], profileViewCb);
    this.render("/verify/:email", ["PUBLIC"], verifyViewCb)
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;
