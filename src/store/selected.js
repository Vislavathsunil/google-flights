// src/store/globalSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "globalState",
  initialState: {
    myState: [],
  },
  reducers: {
    setMyState: (state, action) => {
      // state.myState.push(action.payload);
      const isPresent = state.myState.some(
        (item) => item.id === action.payload.id
      );

      // Only push the item if it doesn't already exist in the array
      if (!isPresent) {
        state.myState.push(action.payload);
      }
    },

    // New action to clear the state
    clearMyState: (state) => {
      state.myState = []; // Reset myState to an empty array
    },
  },
});

// Export actions and reducer
export const { setMyState, clearMyState } = globalSlice.actions;
export default globalSlice.reducer;
