import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FragmentType } from "@/gql/generated";
import { TagButtonFragment } from "@/components/atoms/TagButton";

export interface AllTagsState {
  value: FragmentType<typeof TagButtonFragment>[];
}

const initialState: AllTagsState = {
  value: [],
};

export const allTagsSlice = createSlice({
  name: "allTags",
  initialState,
  reducers: {
    setAllTags: (
      state,
      action: PayloadAction<FragmentType<typeof TagButtonFragment>[]>
    ) => {
      state.value = [...action.payload];
    },
  },
});

export const { setAllTags } = allTagsSlice.actions;

export const selectAllTags = (state: RootState) => state.allTags.value;

export default allTagsSlice.reducer;
