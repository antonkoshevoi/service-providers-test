import { configureStore } from "@reduxjs/toolkit";
import inspectorReducer from "./inspectors/inspectorSlice.ts";

export const store = configureStore({
  reducer: {
    inspector: inspectorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
