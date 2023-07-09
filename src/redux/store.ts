import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import categoryIdReducer from "./categoryIdSlice";

export const store = configureStore({
  reducer: {
    categoryId: categoryIdReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
