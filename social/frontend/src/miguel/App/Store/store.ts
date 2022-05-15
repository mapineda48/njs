import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import counter from "./slice/counter";
import room from "./slice/room";
import guest from "./slice/guest";

const store = configureStore({
  reducer: {
    counter,
    room,
    guest,
  },
  middleware(getDefault) {
    return [...getDefault(), thunk];
  },
});

export default store;

/**
 * Types
 */

export type GetState = typeof store.getState;

export type State = typeof store extends EnhancedStore<infer S, any, any>
  ? S
  : never;
