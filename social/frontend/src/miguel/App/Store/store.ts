import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import counter from "./slice/counter";
import room from "./slice/room";

const store = configureStore({
  reducer: {
    counter,
    room,
  },
});

export default store;

/**
 * Types
 */

export type State = typeof store extends EnhancedStore<infer S, any, any>
  ? S
  : never;
