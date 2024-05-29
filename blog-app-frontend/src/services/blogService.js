
import { useAxiosPost } from "../hooks/useAxios.js";

const BLOG_BASE_PATH = "/blog";

// Blog - Listing API 
export const useBlogList = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const blogListApi = async (
    data,
    config = {}
  ) => {
    return callApi(`${BLOG_BASE_PATH}/list`, data, config);
  };
  return { blogListApi, isLoading, isError, isSuccess };
};

// Blog - Listing API 
export const useBlogGetBySlug = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const blogGetBySlugApi = async (
    data,
    config = {}
  ) => {
    return callApi(`${BLOG_BASE_PATH}/getBySlug`, data, config);
  };
  return { blogGetBySlugApi, isLoading, isError, isSuccess };
};

// Blog - Delete API
export const useBlogDelete = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const blogDeleteApi = async (
    data,
    config = {}
  ) => {
    return callApi(`${BLOG_BASE_PATH}/delete`, data, config);
  };
  return { blogDeleteApi, isLoading, isError, isSuccess };
};

// Blog - Upsert API
export const useBlogUpsert = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const blogUpsertApi = async (
    data,
    config = {}
  ) => {
    return callApi(`${BLOG_BASE_PATH}/upsert`, data, config);
  };
  return { blogUpsertApi, isLoading, isError, isSuccess };
};