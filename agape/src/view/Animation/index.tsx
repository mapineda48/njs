import React from "react";
import Animation, {
  Props as Base,
  OnEndAnimation as EndAnimation,
} from "component/Animation";

import { useSelector, useDispatch } from "store/hook";

import style from "./index.module.scss";

import { State } from "../../store";

export default (props: Props) => {
  const { selector, actionEnd, onInEnd, onOutEnd, ...rest } = props;

  const animation = useSelector(selector);

  const dispatch = useDispatch();

  const onAnimationEnd: EndAnimation = (event) => {
    if (props.onAnimationEnd) {
      props.onAnimationEnd(event);
    }

    actionEnd(dispatch);
  };

  return React.createElement(Animation, {
    ...rest,
    enabled: animation.in,
    active: animation.active,
    onAnimationEnd,
    onInEnd: onInEnd ? () => onInEnd(dispatch) : undefined,
    onOutEnd: onOutEnd ? () => onOutEnd(dispatch) : undefined,
  });
};

/**
 * Typings
 */

type Dispatch = ReturnType<typeof useDispatch>;

export interface StateAnimation {
  in: boolean;
  active: boolean;
}

export interface Props
  extends Omit<Base, "enabled" | "active" | "onInEnd" | "onOutEnd"> {
  selector: (state: State) => StateAnimation;
  actionEnd: (dispatch: Dispatch) => void;
  onInEnd?: (dispatch: Dispatch) => void;
  onOutEnd?: (dispatch: Dispatch) => void;
}

export type OnEndAnimation = EndAnimation;
