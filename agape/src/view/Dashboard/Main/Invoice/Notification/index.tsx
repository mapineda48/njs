import React from "react";
import Button from "component/Button";
import { Router } from "view/Router";

import { useSelector, useDispatch } from "store/hook";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

const Common = ({ children, title }: Props) => {
  const notification = useSelector(
    (state) => state.invoice.view.notification.current
  );

  return (
    <div className={style.content + " panel"}>
      <div className={style.title}>{title}</div>
      <div className={style.message}>{notification}</div>
      <div>{children}</div>
    </div>
  );
};

export const Fatal = () => {
  const { invoice } = useDispatch();

  return (
    <Router
      className={style._}
      animation={animation}
      onOutEnd={({ app }) => {
        app.goWelcome();
      }}
    >
      <Common title="Fatal Error">
        <Button
          onClick={() => {
            invoice.go((view) => view.DISABLED);
          }}
        >
          Salir
        </Button>
      </Common>
    </Router>
  );
};

export const Error = () => {
  const { invoice } = useDispatch();

  return (
    <Router className={style._} animation={animation}>
      <Common title="Ops...">
        <Button onClick={invoice.back}>Volver</Button>
      </Common>
    </Router>
  );
};

export const Success = () => {
  const { invoice } = useDispatch();

  const cbContinue = React.useCallback(() => invoice.go((view) => view.OPEN), [
    invoice,
  ]);

  return (
    <Router
      className={style._}
      animation={animation}
      onOutEnd={({ invoice }) => {
        invoice.reset();
        invoice.go((view) => view.OPEN);
      }}
    >
      <Common title="Operacion Completada">
        <Button onClick={cbContinue}>Continuar</Button>
      </Common>
    </Router>
  );
};

/**
 * Typings
 */

interface Props {
  title: string;
  children: JSX.Element;
}
