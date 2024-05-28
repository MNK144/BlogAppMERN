import morgan from "morgan";
import logger from "../helpers/logger.js";

const stream = {
  // Use the http severity
  write: (message) => logger.http(message),
};

const morganMiddleware = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  // "combined",
  { stream }
);

export default morganMiddleware;