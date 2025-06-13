import setupResponses from "../middlewars/setupResponses.mid.js";
import setupPolicies from "../middlewars/setup.policies.mid.js";

class RouterHelper {
  constructor() {
    this.router = Router();
    this.use(setupResponses);
  }
  getRouter = () => this.router;
  applyCallbacks = (callbacks) =>
    callbacks.map((cb) => async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        next(error);
      }
    });

  applyCallbacks = (callbacks) =>
    callbacks.map((cb) => async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        res.status(error.statusCode || 500).render("error", { error });
      }
    });
  create = (path, policies, ...cbs) =>
    this.router.post(path, setupPolicies(policies), this.applyCallbacks(cbs));
  read = (path, policies, ...cbs) =>
    this.router.get(path, setupPolicies(policies), this.applyCallbacks(cbs));
  render = (path, policies, ...cbs) =>
    this.router.get(
      path,
      setupPolicies(policies),
      this.applyCallbacksToRender(cbs)
    );
  update = (path, policies, ...cbs) =>
    this.router.puth(path, setupPolicies(policies), this.applyCallbacks(cbs));
  delete = (path, policies, ...cbs) =>
    this.router.delete(path, setupPolicies(policies), this.applyCallbacks(cbs));
  use = (path, ...cbs) => this.router.use(path, this.applyCallbacks(cbs));
}

export default RouterHelper;
