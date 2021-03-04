import React from "react";
import Animation, { Props as PropsAnimation, OnEndAnimation } from "..";

import style from "./index.module.scss";

export default (props: Props) => {
  const [active, setActive] = React.useState(!props.enabled);

  React.useMemo(() => {
    setActive((state) => !state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.enabled]);

  const onAnimationEnd: OnEndAnimation = (event) => {
    if (props.onAnimationEnd) {
      props.onAnimationEnd(event);
    }

    const { currentTarget, target } = event;

    if (currentTarget !== target) {
      return;
    }

    setActive(false);
  };

  return React.createElement(Animation, { ...props, active, onAnimationEnd });
};

/**
 * Typings
 */

type Props = Omit<PropsAnimation, "active">;
