import React from "react";
import Input from "component/Input";
import Button from "component/Button";

import { useEventWindow } from "util/hook/eventWindow";

import { useSelector, useDispatch } from "store/hook";

import { useState, SetState } from "./hook";

import { createPopper, PropsContent } from "component/Popper";

import { setHeight, scrollToChild } from "./index.vanilla";

import clsx from "clsx";

import style from "./index.module.scss";

export const listenerKeys = (setState: SetState): ListenerEvent => {
  const { upFocus, downFocus, selectFocus } = setState;

  return ({ keyCode }) => {
    switch (keyCode) {
      case 38:
        return upFocus();
      case 40:
        return downFocus();
      case 13:
      case 9:
        return selectFocus();

      default:
        return;
    }
  };
};

const Products = (props: PData) => {
  const { onRef, effect, inlineStyle, current, names, focus, setState } = props;

  effect((ref) => {
    setHeight(ref);
    scrollToChild(ref, focus);
  });

  useEventWindow(() => {
    return {
      resize: () => setHeight(onRef.current),
    };
  });

  const Names = names.map((name, index) => {
    const from = name.toUpperCase().indexOf(current.toUpperCase());
    const rest = from + current.length;

    return (
      <div
        key={index}
        onMouseEnter={() => setState.updateFocus(index)}
        className={clsx([style.product, focus === index && style.active])}
      >
        {from > 0 ? name.substr(0, from) : null}
        <strong>{name.substr(from, current.length)}</strong>
        {name.substr(rest)}
      </div>
    );
  });

  return (
    <div
      style={inlineStyle}
      onMouseLeave={() => setState.resetFocus()}
      className={style.droplist}
      ref={onRef}
    >
      {Names}
    </div>
  );
};

const DropList = createPopper({
  target: "div",
  options: {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  },
  Content: Products,
});

export default () => {
  const products = useSelector((state) => state.management.products);

  const { invoice } = useDispatch();

  const [state, setState] = useState();

  const list = React.useMemo(
    () => state.coincidences.map((product) => product.fullName),
    [state.coincidences]
  );

  const isReady = state.current.fullName && state.current.quantity;

  const listenerClick = () => {
    invoice.addDetail(state.current);
    setState.reset();
  };

  return (
    <div className={style._}>
      <DropList
        className={style.detail}
        enabledPopper={list.length > 0}
        propsPopper={{
          current: state.current.fullName,
          focus: state.focus,
          setState,
          names: list,
        }}
      >
        <Input.Text
          value={state.preview.fullName || state.current.fullName}
          onBlur={() => setState.selectFocus()}
          onChangeValue={(value) => setState.updateDetail(value, products)}
          onKeyDown={listenerKeys(setState)}
          required
        />
      </DropList>
      <div>
        <Input.Number
          value={state.preview.quantity || state.current.quantity}
          onChangeValue={(value) => setState.updateQuantity(value)}
          placeholder="Cantidad"
          required
        />
      </div>

      <div>
        <Input.Number
          readOnly
          placeholder="Precio"
          value={state.preview.unitPrice || state.current.unitPrice}
          options={{ allowFloat: true }}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChangeValue={() => {}}
        />
      </div>
      <div>
        <Input.Number
          readOnly
          placeholder="Total"
          value={state.current.subTotal + state.current.iva}
          options={{ allowFloat: true }}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChangeValue={() => {}}
        />
      </div>
      <div
        onMouseEnter={!isReady ? () => setState.onNotification() : undefined}
        onMouseLeave={
          !isReady && state.showNoti
            ? () => setState.offNotification()
            : undefined
        }
      >
        <Button
          style={{ cursor: !isReady ? "not-allowed" : undefined }}
          onClick={isReady ? listenerClick : undefined}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
};

/**
 * Typings
 */
interface PData extends PropsContent {
  current: string;
  names: string[];
  focus: number;
  setState: SetState;
}

type ListenerEvent = JSX.IntrinsicElements["div"]["onKeyDown"];
