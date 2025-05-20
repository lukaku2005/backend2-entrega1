import "dotenv/config.js";
import express, { json, urlencoded } from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
/*import session from "express-session";*/
/*import MongoStore from "connect-mongo";*/
import pathHandler from "./src/middlewars/pathHandler.mid.js";
import errorHandler from "./src/middlewars/errorhandler.mid.js";
import router from "./src/routers/index.router.js";
import dbConnect from "./src/helpers/dbConects.helpers.js";

const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("serer listo en " + port);
  await dbConnect(process.env.URL_MONGO);
};
server.listen(port, ready);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use(cookieParser(process.env.SECRET));
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));
/*server.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: process.env.URL_MONGO,
      ttl: 7 * 24 * 60 * 60,
    }),
  })
);*/

server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
