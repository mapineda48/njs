import React from "react";
import { FiHelpCircle } from "react-icons/fi";
import FlipSwitch from "./FlipSwitch";
import Input from "component/Input";
import Button from "component/Button";
import { Router } from "view/Router";
import { createPopper, PropsContent } from "component/Popper";

import { useDispatch } from "store/hook";

import { useState } from "./hook";

import style from "./index.module.scss";
import clsx from "clsx";

const animation = { in: style.in, out: style.out };

const Help = createPopper({
  target: "div",
  options: {
    placement: "left",
  },
  Content: ({ onRef, inlineStyle, dataForDemo }: PHelp) => (
    <div
      className={clsx(["tooltip", style.tooltip])}
      ref={onRef}
      style={inlineStyle}
    >
      {dataForDemo}
      <div className="arrow" data-popper-arrow />
    </div>
  ),
});

export default () => {
  const { invoice } = useDispatch();

  const [state, setState] = useState();

  const {
    setLoading,
    handlerError,
    switchInvoice,
    updateCod,
    updateDni,
  } = setState;

  const isDisabled = state.dni === "" || state.cod === "" ? true : false;

  const dataForDemo = state.isBuy
    ? 'Proveedor: "1652179248"'
    : 'Cliente: "1061591143"';

  const onClickButton = async () => {
    setLoading(true);

    try {
      if (!state.isBuy) {
        await invoice.fetchClient(state.dni);
      } else {
        await invoice.fetchSupplier(state.dni);
      }
      invoice.addCod(state.cod);
    } catch (error) {
      handlerError(error);
    }
  };

  const onKeyEnter: OnKeyEnter = ({ keyCode }) => {
    if (keyCode !== 13) return;
    onClickButton();
  };

  return (
    <Router
      className={style.init}
      animation={animation}
      onKeyDown={(!isDisabled && onKeyEnter) || undefined}
    >
      <div className={style.content + " panel"}>
        <Help
          className={style.help}
          title="help"
          enabledPopper="auto"
          propsPopper={{ dataForDemo }}
        >
          <FiHelpCircle />
        </Help>
        <div className={style.row}>
          <h1>Facturación</h1>
        </div>
        <div className={style.row}>
          <FlipSwitch onClick={switchInvoice} />
        </div>
        <div className={style.row}>
          <h2>Codigo</h2>
        </div>
        <div className={style.row}>
          <Input.Text
            value={state.cod}
            onChangeValue={(value) => updateCod(value)}
          />
        </div>
        <div className={style.row}>
          <h2>{state.isBuy ? "Proveedor" : "Cliente"}</h2>
        </div>
        <div className={style.row}>
          <Input.Text
            className="input"
            onChangeValue={(value) => updateDni(value)}
            value={state.dni}
            title={dataForDemo}
          />
        </div>
        <div
          className={style.row}
          style={{
            color: state.error ? "red" : "transparent",
            fontWeight: "bold",
            pointerEvents: "none",
          }}
        >
          {state.error ? state.error : "error"}
        </div>
        <div className={style.row}>
          <Button
            ripple
            loading={state.isLoading}
            disabled={isDisabled}
            onClick={onClickButton}
          >
            Continue
          </Button>
        </div>
      </div>
    </Router>
  );
};

/**
 * Typings
 */

type OnKeyEnter = JSX.IntrinsicElements["div"]["onKeyDown"];

interface PHelp extends PropsContent {
  dataForDemo: string;
}
