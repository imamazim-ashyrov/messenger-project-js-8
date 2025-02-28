import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    saveMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { saveMessages } = messengerSlice.actions;
export default messengerSlice.reducer;
