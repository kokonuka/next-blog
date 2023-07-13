import { configureStore } from "@reduxjs/toolkit";
import categoryIdReducer from "./Slice/categoryIdSlice";
import counterReducer from "./Slice/counterSlice";
import allTagsReducer from "./Slice/allTagsSlice";
import displayedTagsReducer from "./Slice/displayedTagsSlice";

export const store = configureStore({
  reducer: {
    categoryId: categoryIdReducer,
    counter: counterReducer,
    allTags: allTagsReducer,
    displayedTags: displayedTagsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
