import React from "react";
import Client from "./Client";
import Employee from "./Employee";
import Supplier from "./Supplier";
import Product from "./Product";
import Buy from "./Buy";
import Sell from "./Sell";

import { useSelector } from "store/hook";
import { table } from "http/idiom";

import style from "./index.module.scss";

const { spanish } = table;

export default () => {
  const current = useSelector((state) => state.management.table.current);

  switch (current) {
    case spanish.client:
      return <Client />;
    case spanish.supplier:
      return <Supplier />;
    case spanish.employee:
      return <Employee />;
    case spanish.product:
      return <Product />;
    case spanish.buy:
      return <Buy />;
    case spanish.sell:
      return <Sell />;

    default:
      return null;
  }
};
