import React from "react";
import { Creators, Result } from "./wrap";

const value: any = null;

export const Context = React.createContext<Dispatch>(value);

export const useDispatch = () => {
  return React.useContext(Context);
};

export type Dispatch = Result<Creators>;
