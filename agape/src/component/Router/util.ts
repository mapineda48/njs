import React from "react";
import { Routers, PropsRouters } from ".";

export const createRouters = (input: PropsRouters) => {
  return () => React.createElement(Routers, input);
};
