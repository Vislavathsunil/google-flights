// src/store/globalSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const cabinSlice = createSlice({
  name: "cabinState",
  initialState: {
    myCabin: {
      stop: "",
      cabin: "",
    },
  },
  reducers: {
    setMyCabin: (state, action) => {
      state.myState.stop = action.payload.stop;
      state.myState.cabin = action.payload.cabin;
    },
  },
});

// Export actions and reducer
export const { setMyCabin } = cabinSlice.actions;
export default cabinSlice.reducer;
