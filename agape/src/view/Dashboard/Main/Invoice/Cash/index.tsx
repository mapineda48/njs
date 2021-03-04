import React from "react";
import Button from "component/Button";
import Input from "component/Input";
import { FaTimes, FaCheck } from "react-icons/fa";

import { useDispatch, useSelector } from "store/hook";
import { Router } from "view/Router";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

export default () => {
  const total = useSelector(
    (state) => state.invoice.subTotal + state.invoice.iva
  );

  const { invoice } = useDispatch();

  const [cash, setCash] = React.useState("");

  const difference = parseInt(cash) - total;

  const updateCash = (cash: string) => {
    const isValid = /[0-9]/g.test(cash);
    const isEmpty = cash === "";
    if (isValid || isEmpty) {
      setCash(cash);
    }
  };

  const isDisabled = cash === "" || parseInt(cash) < total;

  return (
    <Router className={style._} animation={animation}>
      <div className={style.content + " panel"}>
        <div className={style.row}>
          <h1>Cashing</h1>
        </div>
        <div className={style.row}>
          <h2>Total</h2>
        </div>
        <div className={style.row}>
          <h3>
            {total.toLocaleString("de-DE", {
              maximumFractionDigits: 2,
            })}
          </h3>
        </div>
        <div className={style.row}>
          <h2>Cash</h2>
        </div>
        <div className={style.row + " " + style.input}>
          <Input.Text
            value={cash}
            onChangeValue={(value) => updateCash(value)}
          />
        </div>
        <div className={style.row}>
          <h2>Difference</h2>
        </div>
        <div className={style.row}>
          {difference.toLocaleString("de-DE", {
            maximumFractionDigits: 2,
          })}
        </div>
        <div className={style.row}>
          <Button
            ripple
            green
            onClick={() => invoice.create()}
            disabled={isDisabled}
          >
            <FaCheck />
          </Button>
          <Button ripple red onClick={() => invoice.back()}>
            <FaTimes />
          </Button>
        </div>
      </div>
    </Router>
  );
};
