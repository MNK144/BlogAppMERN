import Axios from "../axios.js";
import { useState } from "react";

export const useAxiosPost = () => {
  // ================= State ====================
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const postRequest = async (
    url,
    data,
    config = {}
  ) => {
    try {
      setIsLoading(true);
      const response = await Axios.post(url, data, { ...config });
      setIsLoading(false);
      setIsSuccess(true);
      return { data: response.data };
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      return {
        error: error?.message || error,
        data: error?.data,
      };
    }
  };

  return [postRequest, { isLoading, isError, isSuccess }];
};