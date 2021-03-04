import React from "react";
import Animation from "view/Animation";
import Position from "./Position";
import { MdEdit, MdDelete } from "react-icons/md";

import { useDispatch, useSelector } from "store/hook";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

export const Delete = () => {
  const { management } = useDispatch();

  return (
    <Animation
      hidden
      title="Eliminar"
      className={style.tool}
      animation={animation}
      onClick={() => management.confirm("¿Eliminar El Registro")}
      selector={(state) => state.management.delete}
      actionEnd={() => {
        management.endDelete();
        management.toggleEdit();
      }}
    >
      <MdDelete />
    </Animation>
  );
};

export const Edit = () => {
  const { management } = useDispatch();

  return (
    <Animation
      title="Editar"
      className={style.tool}
      animation={animation}
      selector={(state) => state.management.edit}
      actionEnd={() => management.endEdit()}
      onClick={() => {
        management.toggleDelete();
      }}
      onOutEnd={() => management.toggleReadOnly()}
    >
      <MdEdit />
    </Animation>
  );
};

export default () => {
  const active = useSelector(
    (state) =>
      state.management.delete.active ||
      state.management.edit.active ||
      state.management.collapsible.animation.active
  );

  return (
    <Position
      fixed={!active}
      style={{ pointerEvents: active ? "none" : undefined }}
    >
      <Edit />
      <Delete />
    </Position>
  );
};
