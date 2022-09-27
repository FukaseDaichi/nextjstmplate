import { createSlice } from "@reduxjs/toolkit";
import type { User } from "src/type";

const initialUserData: User = {
  no: 1,
  src: "",
  name: "",
};

const userSlice = createSlice({
  name: "room",
  initialState: initialUserData,
  reducers: {
    setUser: (state: any, action) => {
      state = action.payload;
    },
    setName: (state: any, action) => {
      state.name = action.payload;
    },
    setSrc: (state: any, action) => {
      state.src = action.payload;
    },
    setNo: (state: any, action) => {
      state.no = action.payload;
    },
  },
});

// eslint-disable-next-line import/no-default-export
export default userSlice;
