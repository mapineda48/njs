import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Animation from "view/Animation";
import Confirm from "./Confirm";

import { useSelector, useDispatch } from "store/hook";

import { useInMediaQuery } from "util/hook/inMediaQuiery";

import clsx from "clsx";

import style from "./index.module.scss";

const animationStyle = { in: style.in, out: style.out };

const mediaMobile = "(max-width: 800px)";

export default () => {
  const inMedia = useInMediaQuery(mediaMobile);

  const animation = useSelector((state) => state.invoice.animation);

  const { invoice } = useDispatch();

  if (!inMedia) {
    return (
      <div className={style._}>
        <Confirm />
      </div>
    );
  }

  const ButtonToggle = (
    <div
      className={clsx([style.bttnToggle, "fadeIn"])}
      onClick={() => invoice.toggleInfo()}
    >
      {!animation.in ? <FaAngleRight /> : <FaAngleLeft />}
    </div>
  );

  return (
    <>
      {!animation.active && ButtonToggle}
      <Animation
        className={style._}
        animation={animationStyle}
        selector={({ invoice }) => invoice.animation}
        actionEnd={() => invoice.endInfo()}
      >
        <div className={style._}>
          <Confirm />
        </div>
      </Animation>
    </>
  );
};

/**
 * Typings
 */

interface State {
  inMedia: boolean;
  active: boolean;
  onTransition: boolean;
  in: boolean;
  show: boolean;
}
