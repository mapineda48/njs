import * as type from "./type";
import { table } from "../../http/idiom";
import { router, animation } from "../../component/Router/state";
import { Product, DataBase, Results } from "shared";

export const state: State = {
  type: type.action.INIT,
  task: router.create({
    current: type.view.OPEN,
    notification: {
      types: [
        type.view.CONFIRM,
        type.view.FINISH,
        type.view.LOADING,
        type.view.NOTIFICATE,
      ],
    },
  }),
  collapsible: router.create({
    current: type.view.OPEN,
    notification: {
      types: [
        type.view.CONFIRM,
        type.view.FINISH,
        type.view.LOADING,
        type.view.NOTIFICATE,
      ],
    },
    disabled: { types: [type.view.LOADING, type.view.SEARCH, type.view.OPEN] },
  }),
  table: router.create({
    current: table.spanish.client,
  }),
  delete: animation.setDisabled(),
  edit: animation.setDisabled(),
  products: [],
  results: [],
  record: null,
  readonly: false,
  create: true,
};

/**
 * Typings
 */
export interface State {
  type: type.Types;
  task: router.State<type.View>;
  collapsible: router.State<type.View>;
  table: router.State<string>;
  edit: animation.State;
  delete: animation.State;
  record: Current;
  products: Product[];
  results: Results;
  readonly: boolean;
  create: boolean;
}

type PipeDB = Omit<DataBase, "type_client" | "type_employee">;

export type Table = keyof PipeDB;

export type Record<T extends Table = Table> = PipeDB[T];

export type Current<T extends Table = Table> = {
  current: Record<T>;
  preview: Record<T>;
} | null;

export type Updated<T extends Table = Table> = Partial<Record<T>>;

export type Result<T extends Table = Table> = PipeDB[T];
