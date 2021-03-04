import React from "react";
import { FaTimes } from "react-icons/fa";

import { useSelector, useDispatch } from "store/hook";

import style from "./index.module.scss";

export default (prop: Prop) => {
  const details = useSelector((state) => state.invoice.details);

  const { invoice } = useDispatch();

  return (
    <div className={style._ + " panel"}>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.th}> </th>
            <th className={style.th}>Cod</th>
            <th className={style.th + " " + style.name}>Full Name</th>
            <th className={style.th}>Unit Price</th>
            <th className={style.th}>Quantity</th>
            <th className={style.th}>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => {
            return (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 !== 0 ? "whitesmoke" : undefined,
                }}
              >
                <td
                  onClick={() => invoice.removeDetail(detail.id)}
                  className={style.remove}
                >
                  <FaTimes />
                </td>
                <td>{detail.cod}</td>
                <td>{detail.fullName}</td>
                <td>
                  {detail.unitPrice.toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>{detail.quantity.toLocaleString("de-DE")}</td>
                <td>
                  {detail.subTotal.toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Typings
 */

interface Prop {}
