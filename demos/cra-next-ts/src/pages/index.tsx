import React from "react";
import HelloWorld from "../components/HelloWorld";
import reportWebVitals from "../reportWebVitals";
import { getGreet } from "../util";

import type { GetStaticProps } from "next";

export default function Hello(props: Props) {
  React.useEffect(() => {
    reportWebVitals();
  });

  return <HelloWorld>{props.greet}</HelloWorld>;
}

/**
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const greet = await getGreet();

  const props: Props = { greet };

  return {
    props,
  };
};

/**
 * Types
 */
export interface Props {
  greet: string;
}
