import mongoose from "mongoose";
import { MONGODB_CONNECTION_STRING } from "./config.js";
import logger from "../helpers/logger.js";

const dbURL = `${MONGODB_CONNECTION_STRING}?retryWrites=true&w=majority`;

export const initMongoDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    const res = await mongoose.connect(
      dbURL,
      {},
    );
    logger.info("MongoDB Connected Successfully");
  } catch (err) {
    logger.error(err);
    throw new Error(err);
  }
}