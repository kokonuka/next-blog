import { createSlice } from "@reduxjs/toolkit";

export const categoryIdSlice = createSlice({
  name: "categoryId",
  initialState: {
    id: "",
  },
  reducers: {
    set: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { set } = categoryIdSlice.actions;
export default categoryIdSlice.reducer;
