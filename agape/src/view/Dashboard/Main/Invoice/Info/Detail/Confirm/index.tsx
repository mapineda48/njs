import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Button from "component/Button";

import { useDispatch, useSelector } from "store/hook";

import style from "./index.module.scss";

const applyFormat = (value: number) => {
  return value.toLocaleString("de-DE", {
    maximumFractionDigits: 2,
  });
};

export default () => {
  const employee = useSelector((state) => state.app.employee);

  const state = useSelector((state) => state.invoice);

  const { invoice } = useDispatch();

  const { details, cod, client, supplier } = state;

  const total = details
    .map((detail) => detail.subTotal)
    .reduce((prev, current) => current + prev, 0);

  const iva = total * 0.16;

  const subtotal = total - iva;

  const Totales = (
    <>
      <div>
        <span className={style.span}>Cantidad</span>
      </div>
      <div>{details.length}</div>
      <div>
        <span className={style.span}>Subtotal</span>
      </div>
      <div>{applyFormat(subtotal)}</div>
      <div>
        <span className={style.span}>Iva</span>
      </div>
      <div>{applyFormat(iva)}</div>
      <div>
        <span className={style.span}>Total</span>
      </div>
      <div>{applyFormat(total)}</div>
    </>
  );

  const ButtonSuccess = (
    <Button
      ripple
      green
      onClick={() => {
        invoice.go((view) => view.CASH);
      }}
      disabled={details.length < 1}
    >
      <FaCheck />
    </Button>
  );

  return (
    <div className={style._}>
      <div className={style.colspanTwo}>
        <h1>
          <span className={style.span}>{"Factura - " + cod}</span>
        </h1>
      </div>
      <div>
        <span className={style.span}>Tipo</span>
      </div>
      <div>venta</div>
      <div className={style.colspanTwo}>
        <h1>
          <span className={style.span}>Empleado</span>
        </h1>
      </div>
      <div>
        <span className={style.span}>Nombre</span>
      </div>
      <div>{employee.firstName + " " + employee.lastName}</div>
      <div>
        <span className={style.span}>Cargo</span>
      </div>
      <div>{employee.type}</div>
      <div className={style.colspanTwo}>
        <h1>
          <span className={style.span}>Cliente</span>
        </h1>
      </div>
      <div>
        <span className={style.span}>Nombre</span>
      </div>
      <div>
        {client
          ? client.firstName + " " + client.lastName
          : supplier
          ? supplier.firstName + " " + supplier.lastName
          : "unknown"}
      </div>
      <div>
        <span className={style.span}>Documento</span>
      </div>
      <div>{client ? client.dni : supplier ? supplier.dni : "unknown"}</div>
      <div>
        <span className={style.span}>Tipo</span>
      </div>
      <div>{client ? client.type : "unknown"}</div>
      <div className={style.colspanTwo}>
        <h1>
          <span className={style.span}>Totales</span>
        </h1>
      </div>
      {Totales}
      <div className={style.colspanTwo + " " + style.buttons}>
        {ButtonSuccess}
        <Button ripple red onClick={() => invoice.cancel()}>
          <FaTimes />
        </Button>
      </div>
    </div>
  );
};

/**
 * Typings
 */
