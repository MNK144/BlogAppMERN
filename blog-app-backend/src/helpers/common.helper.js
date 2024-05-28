
/**
 * Sends a general response with the provided data, message, success status,
 * toast flag, and status code.
 *
 * @param {Object} response - The response object to send the response to.
 * @param {any} [data=null] - The data to include in the response.
 * @param {string} [message=""] - The message to include in the response.
 * @param {boolean} [isSuccess=true] - The success status of the response.
 * @param {boolean} [toast=false] - The toast flag of the response.
 * @param {number} [statusCode=200] - The status code of the response.
 * @return {void}
 */
export const generalResponse = (
  response,
  data = null,
  message = "",
  isSuccess = true,
  toast = false,
  statusCode = 200
) => {
  response.status(statusCode).send({
    data: data,
    message: message,
    toast: toast,
    isSuccess: isSuccess,
  });
};
