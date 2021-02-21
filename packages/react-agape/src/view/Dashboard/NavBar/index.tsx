import React from "react";
import { FaUserAlt, FaCashRegister, FaDatabase } from "react-icons/fa";
import { createPopper, PropsContent } from "component/Popper";
import clsx from "clsx";
import { useDispatch, useSelector } from "store/hook";

import style from "./index.module.scss";

const Setting = createPopper({
  target: "div",
  options: { placement: "left" },
  Content: ({ onRef, inlineStyle }) => (
    <div className="tooltip" ref={onRef} style={inlineStyle}>
      Proximamente!!!
      <div className="arrow" data-popper-arrow />
    </div>
  ),
});

const DropDown = ({ onRef, inlineStyle, exit }: PDropDown) => {
  return (
    <div ref={onRef} style={inlineStyle} className={style.dropdown}>
      <Setting enabledPopper="auto">Configuracion</Setting>
      <div className="" onClick={exit}>
        Salir
      </div>
    </div>
  );
};

const Menu = createPopper({
  target: "div",
  options: { placement: "bottom" },
  Content: DropDown,
});

export default () => {
  const [show, setShow] = React.useState(false);

  const name = useSelector((state) => state.app.employee.firstName);

  const { app } = useDispatch();

  const toggle = React.useCallback(() => setShow((state) => !state), [setShow]);

  const [exit, goWelcome, goInvoice, goManagement] = React.useMemo(() => {
    return [
      () => app.goLogin(),
      () => app.goWelcome(),
      () => app.gooInvoice(),
      () => app.goManagement(),
    ];
  }, [app]);

  return (
    <nav className={style.nav}>
      <div className={style.brand}>
        <h1 onClick={goWelcome}>Agapé</h1>
      </div>
      <div className={style.ul}>
        <div className={style.li} onMouseEnter={toggle} onMouseLeave={toggle}>
          <Menu enabledPopper={show} propsPopper={{ exit }}>
            <FaUserAlt className={style.icon} />
            <span className={style.span}>{name || "unknow user"}</span>
          </Menu>
        </div>
        <div className={clsx([style.li, style.underline])} onClick={goInvoice}>
          <FaCashRegister className={style.icon} />
          <span className={style.span}>Facturar</span>
        </div>
        <div
          className={clsx([style.li, style.underline])}
          onClick={goManagement}
        >
          <FaDatabase className={style.icon} />
          <span className={style.span}>Administrar</span>
        </div>
      </div>
    </nav>
  );
};

/**
 * Tyíngs
 */

interface PDropDown extends PropsContent {
  exit: () => void;
}
