import { configureStore } from "@reduxjs/toolkit";
import messengerSlice from "./slices/messengerSlice";

const store = configureStore({
  reducer: {
    messenger: messengerSlice,
  },
});

export default store;
