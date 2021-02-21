import React from "react";

export default function Root(props: Props) {
  return React.createElement(React.Fragment, props);
}

/**
 * Types
 */

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
