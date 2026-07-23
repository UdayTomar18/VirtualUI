import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    allComponents: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    setAllComponents: (state, action) => {
      state.allComponents = action.payload;
    },
  },
});

export const { setUserData, setAllComponents } = userSlice.actions;

export default userSlice.reducer;
