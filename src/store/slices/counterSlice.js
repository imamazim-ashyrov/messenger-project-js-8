import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
  };
  
  const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
      plusHandler: (state) => {
        console.log('plus');
        
        state.count += 1;
      },
      minusHandler: (state) => {
        console.log('minus');
        
        state.count -= 1;
      },
    },
  });
  
  export const { plusHandler, minusHandler } = counterSlice.actions;
  export default counterSlice