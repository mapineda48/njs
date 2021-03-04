import React from "react";
import { Routers, PropsRouters } from ".";

export const createRouters = <T extends string>(input: PropsRouters<T>) => {
  return () => React.createElement(Routers, input);
};


