import passport from "./passport.mid.js";

const passportCb = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, (error, user, info) => {
    try {
      if (error) throw error;
      if (!user) {
        const err = new Error(info?.message || "invalido");
        error.statusCode = info?.statusCode || 403;
        throw err;
      }
      req.user = user
      next()
    } catch (error) {
      next(error);
    }
  })(req,res,next);
};
export default passportCb
