import { combineReducers } from "@reduxjs/toolkit";
import { reducer as blogReducer } from "./slices/blogSlice.js";
import { reducer as toastReducer } from "./slices/toastSlice.js";

const rootReducer = combineReducers({
  blog: blogReducer,
  toast: toastReducer
});

export default rootReducer;