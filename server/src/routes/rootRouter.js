import express from "express";
import clientRouter from "./clientRouter.js";
import booksRouter from "./api/v1/booksRouter.js"

const rootRouter = new express.Router();

rootRouter.use("/api/v1/books", booksRouter)

rootRouter.use("/", clientRouter);

export default rootRouter;
