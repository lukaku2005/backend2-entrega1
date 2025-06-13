import "./src/helpers/env.helper.js";
import express from 'express';
import morgan from "morgan";
import dbConnect from "./src/helpers/dbConnect.helper.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import cookieParser from "cookie-parser";
import {engine} from 'express-handlebars'
import path from 'path'
import __dirname from "./dirname.js";

import argvsHelper from "./src/helpers/argvs.helper.js";

const server = express()
const PORT = process.env.PORT || 8080
const ready = async () => { 
  console.log(`Server running on http://localhost:${PORT} and mode ${argvsHelper.mode}`)
  if (process.env.PERSISTENCE === "mongo") {
    await dbConnect(process.env.LINK_DB);
  }
}
server.listen(PORT, ready())

server.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "src", "views", "layouts"),
    partialsDir: path.join(__dirname, "src/views/layouts"),
  })
)
server.set("view engine", "handlebars");
server.set("views", path.join(__dirname, "src", "views"));

server.use(cookieParser("PARA_FIRMAR")) 
server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 

server.use(express.static(path.join(__dirname, "public")))
server.use(morgan("dev"))


server.use("/", indexRouter) 
server.use(errorHandler)
server.use(pathHandler)
