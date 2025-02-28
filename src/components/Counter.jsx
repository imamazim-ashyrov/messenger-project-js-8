import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { minusHandler, plusHandler } from "../store/slices/counterSlice";

const Counter = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.counter.count);
    console.log(store);
  return (
    <div>
      <h1>{store}</h1>
      <button onClick={() => dispatch(plusHandler())}>Plus</button>
      <button onClick={() => dispatch(minusHandler())}>Minus</button>
    </div>
  );
};

export default Counter;
