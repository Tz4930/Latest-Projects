import { configureStore } from "@reduxjs/toolkit";
import activityDetail  from "../features/activitySlice";
export const store = configureStore({
  reducer: {
    app: activityDetail,
  },
});