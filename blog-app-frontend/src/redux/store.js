import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
});

export default store;