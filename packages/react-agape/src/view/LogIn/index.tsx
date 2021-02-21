import React from "react";
import { FiLogIn, FiHelpCircle } from "react-icons/fi";
import Button from "component/Button";
import Input from "component/Input";
import { Router } from "view/Router";
import { createPopper } from "component/Popper";

import { useDispatch } from "store/hook";

import { useState } from "./hook";

import clsx from "clsx";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

const Help = createPopper({
  target: "div",
  options: {
    placement: "left",
  },
  Content: ({ onRef, inlineStyle }) => (
    <div className="tooltip" ref={onRef} style={inlineStyle}>
      user: &quot;mapineda48&quot;
      <br />
      password: &quot;12345&quot;
      <div className="arrow" data-popper-arrow />
    </div>
  ),
});

export default () => {
  const { app } = useDispatch();

  const [state, setState] = useState();

  const { setLoading, addError, updatePassword, updateUsername } = setState;

  const onClickLogIn = async () => {
    setLoading(true);

    try {
      await app.logIn(state.username, state.password);
    } catch (error) {
      addError(error);
    }
  };

  const onKeyEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13 && !isDisabled) {
      onClickLogIn();
    }
  };

  const isDisabled =
    state.username === "" || state.password === "" ? true : false;

  return (
    <Router className={style._} animation={animation} onKeyDown={onKeyEnter}>
      <div className={clsx([style.content, "panel"])}>
        <Help className={style.help} title="help" enabledPopper="auto">
          <FiHelpCircle />
        </Help>
        <div className={style.title}>
          <h1>Agapé</h1>
        </div>
        <div className={style.input}>
          <Input.Text
            type="text"
            placeholder="User"
            value={state.username}
            onChangeValue={updateUsername}
            title='escribe "mapineda48'
          />
        </div>
        <div className={style.input}>
          <Input.Text
            type="password"
            placeholder="Password"
            value={state.password}
            onChangeValue={updatePassword}
            title='escribe "12345"'
          />
        </div>
        <div
          className={style.error}
          style={{
            color: !state.error ? "#fafafa" : undefined,
            pointerEvents: !state.error ? "none" : undefined,
          }}
        >
          {!state.error ? "im a error" : state.error.message}
        </div>
        <div className={style.button}>
          <Button
            ripple
            disabled={isDisabled}
            loading={state.isLoading}
            onClick={onClickLogIn}
          >
            Entrar
            <FiLogIn />
          </Button>
        </div>
      </div>
    </Router>
  );
};
