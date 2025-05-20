import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { compareHash, createHash } from "../helpers/hash.util.js";
import { userManager } from "../data/manager.mongo.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { createToken } from "../helpers/token.utils.js";

const callbackURL = "http://localhost:8080/api/auth/google/redirect";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const { city } = req.body;
        if (!city) {
          return done(null, null, {
            message: "data invalida",
            statusCode: 400,
          });
        }
        let user = await userManager.readBy({ email });
        if (user) {
          return done(null, null, {
            message: "credenciales invalidas",
            statusCode: 401,
          });
        }
        req.body.password = createHash(password);
        user = await userManager.createOne(req.body);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await userManager.readBy({ email });
        if (!user) {
          return done(null, null, {
            message: "credenciales invalidas",
            statusCode: 401,
          });
        }
        const verify = compareHash(password, user?.password);
        if (!verify) {
          return done(null, null, {
            message: "credenciales invalidas",
            statusCode: 401,
          });
        }
        const data = {
          _id: user._id,
          role: user.role,
          email,
        };
        const token = createToken(data);
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const { email, name, picture, id } = profile;
        let user = await userManager.readBy({ email: id });
        if (!user) {
          user = {
            email: id,
            name: name.givenName,
            avatar: picture,
            password: createHash(email),
            city: "Google",
          };
          user = await userManager.createOne(user);
        }
        const data = {
          _id: user._id,
          role: user.role,
          email,
        };
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "user",
  new jwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token,
      ]),
    },
    async (data, done) => {
      try {
        const { _id, role, email } = data;
        const user = await userManager.readBy({ _id, role, email });
        if (!user) {
          const error = new Error("invalido");
          error.statusCode = 403;
          throw error;
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "admin",
  new jwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token,
      ]),
    },
    async (data, done) => {
      try {
        const { _id, role, email } = data;
        const user = await userManager.readBy({ _id, role, email });
        if (!user && user?.role !== "ADMIN") {
          const error = new Error("invalido");
          error.statusCode = 403;
          throw error;
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
