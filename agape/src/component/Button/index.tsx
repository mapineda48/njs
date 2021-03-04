import React from "react";
import Ripple from "./Ripple";

import clsx from "clsx";

import style from "./index.module.scss";

export default (props: Props) => {
  const { loading, green, red, ripple, ...rest } = props;

  const className = clsx([
    rest.className,
    style._,
    style.primary,
    green && style.green,
    red && style.red,
    loading && style.loader,
  ]);

  if (ripple) {
    return (
      <Ripple>
        <button {...rest} className={className} />
      </Ripple>
    );
  }

  return <button {...rest} className={className} />;
};

/**
 * Typings
 */
interface Props extends NativeProps {
  ripple?: boolean;
  loading?: boolean;
  green?: boolean;
  red?: boolean;
}

type NativeProps = JSX.IntrinsicElements["button"];
