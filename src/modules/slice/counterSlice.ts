import { createSlice } from "@reduxjs/toolkit";

const counterslice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state, __action) => {
      return state + 1;
    },
    decrement: (state, __action) => {
      return state - 1;
    },
  },
});

// eslint-disable-next-line import/no-default-export
export default counterslice;
