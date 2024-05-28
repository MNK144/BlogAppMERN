import { generalResponse } from '../helpers/common.helper.js';
import logger from '../helpers/logger.js';

const errorFilterValidator = (error) => {
  const extractedErrors = [];
  error.map((err) => extractedErrors.push(err.message));
  const errorResponse = extractedErrors.join(', ');
  return errorResponse;
};

const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      logger.error("Validation error:",error);
      if (error.details) {
        const errorResponse = errorFilterValidator(error.details);
        return generalResponse(res, null, errorResponse, false, true, 400);
      }
      return generalResponse(res, null, 'Something went wrong!', false, true, 400);
    }
  };
};

export default validationMiddleware;
