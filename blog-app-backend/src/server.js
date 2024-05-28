import {
  PORT,
} from "./config/config.js";
import express from "express";
import cors from "cors";
import { initMongoDB } from "./config/mongodb.js";
import logger from "./helpers/logger.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import morganMiddleware from "./middlewares/morgan.middleware.js";
import BlogRouter from "./modules/blog/blog.routes.js";

const app = express();
const port = PORT || 8002;

//Setting Up Middlewares
app.use(express.json());
app.use(cors());
app.use(morganMiddleware);

//Setting Up MongoDB
initMongoDB();

//Setting Up Routes
app.use('/blog/', BlogRouter);

app.get("/", async (req,res) => {
  res.json({ 
    message: "BlogApp Service Status: OK",
  });
});

//Setting Up Error Handling
app.use(errorMiddleware);

//Firing up Server
app.listen(port, async () => {
  logger.info(`***********************************************`);
  logger.info(`**** BlogApp Server Listening on port ${port} ****`);
  logger.info(`***********************************************`);
});
