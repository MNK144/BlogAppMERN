import { generalResponse } from '../helpers/common.helper.js';
import logger from '../helpers/logger.js';

const errorMiddleware = (error, req, res, next) => {
  try {
    const message = error.message || 'Something went wrong';
    logger.error("Error: ", error);
    return generalResponse(res, [], message, false, true, 500);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
