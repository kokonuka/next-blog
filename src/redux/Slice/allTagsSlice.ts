import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Tag } from "../../graphql/generate/graphql";

export interface AllTagsState {
  value: Tag[];
}

const initialState: AllTagsState = {
  value: [],
};

export const allTagsSlice = createSlice({
  name: "allTags",
  initialState,
  reducers: {
    setAllTags: (state, action: PayloadAction<Tag[]>) => {
      state.value = [...action.payload];
    },
  },
});

export const { setAllTags } = allTagsSlice.actions;

export const selectAllTags = (state: RootState) => state.allTags.value;

export default allTagsSlice.reducer;
