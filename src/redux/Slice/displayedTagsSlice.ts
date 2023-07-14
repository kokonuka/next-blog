import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Tag } from "../../graphql/generate/graphql";
import { FragmentType } from "@/gql";
import { TagButtonFragment } from "@/components/atoms/TagButton";

export interface DisplayedTagsState {
  value: FragmentType<typeof TagButtonFragment>[];
}

const initialState: DisplayedTagsState = {
  value: [],
};

export const displayedTagsSlice = createSlice({
  name: "displayedTags",
  initialState,
  reducers: {
    setDisplayedTags: (
      state,
      action: PayloadAction<FragmentType<typeof TagButtonFragment>[]>
    ) => {
      state.value = [...action.payload];
    },
  },
});

export const { setDisplayedTags } = displayedTagsSlice.actions;

export const selectDisplayedTags = (state: RootState) =>
  state.displayedTags.value;

export default displayedTagsSlice.reducer;
