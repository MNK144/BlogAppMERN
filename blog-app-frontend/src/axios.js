import axios from "axios"
import { REACT_APP_API_URL } from "./config"
import { removeToast, setToast } from "./redux/slices/toastSlice"

export const Axios = axios.create({
  baseURL: REACT_APP_API_URL,
})

export const setupAxios = (store) => {
  Axios.interceptors.response.use(
    (res) => {
      const { toast } = res.data;
      if (toast) {
        // ----------- set api response toast -----------
        // const toastId = new Date().getTime();
        // store.dispatch(
        //   setToast({
        //     message: res.data.message,
        //     type: res.data.responseType,
        //     id: toastId,
        //   })
        // );
        // setTimeout(() => {
        //   store.dispatch(removeToast({ id: toastId }));
        // }, 2000);
      }
      return res.data;
    },
    (e) => {
      if (
        e.response.status === 400 ||
        e.response.status === 500 ||
        e.response.status === 401 ||
        e.response.status === 403 ||
        e.response.status === 0
      ) {
        // const { toast } = e.response?.data ?? {};
        // if (toast || e.response.status === 0) {
        //   // ----------- set api response toast -----------
        //   const toastId = new Date().getTime();
        //   store.dispatch(
        //     setToast({
        //       message: e.response.status === 0 ? e.message : e.response.data.message,
        //       type: e.response?.data?.responseType ?? "error",
        //       id: toastId,
        //     })
        //   );
        //   setTimeout(() => {
        //     store.dispatch(removeToast({ id: toastId }));
        //   }, 3000);
        // }
      }
      throw e.response.data;
    }
  );
}

export default Axios;