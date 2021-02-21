import React from "react";
import Admin, { useSigma, type } from "./state";
import { Actions, Ref } from "./Action";
import Welcome from "./Welcome";
import Create from "./Create";
import Search from "./Search";
import Notify from "./Notify";
import Person from "./Person";
import Persons from "./Persons";

import style from "./index.module.scss";

function CurrentView() {
  const [state] = useSigma();

  switch (state.view) {
    case type.WELCOME:
      return <Welcome />;
    case type.CREATE:
      return <Create />;
    case type.SEARCH:
      return <Search />;
    case type.NOTIFY:
      return <Notify />;
    case type.PERSON:
      return <Person />;
    case type.PERSONS:
      return <Persons />;

    default:
      return null;
  }
}

export default function () {
  const ref: Ref = React.useRef(null);

  return (
    <Admin>
      <div className={style._}>
        <div>
          <div>
            <Actions container={ref}>
              <CurrentView />
            </Actions>
          </div>
          <div ref={ref} className="panel"></div>
        </div>
      </div>
    </Admin>
  );
}
