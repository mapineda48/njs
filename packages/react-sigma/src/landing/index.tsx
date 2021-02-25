import React from "react";
import Root from "components/Root";
import Confirm from "components/Confirm";
import Person from "components/Person";
import useState from "./state";
import { hydrate } from "../common";
import image from "./image";
import "./style/index.scss";

hydrate(<Landing />);

function Landing() {
  const [state, , http] = useState();

  const shouldFetchColombia =
    !state.colombia && !state.isLoading && !state.confirm.message;

  React.useEffect(() => {
    if (!shouldFetchColombia) return;

    http.fetchColombia();
  }, [http, shouldFetchColombia]);

  React.useEffect(() => {
    window.document.title = "Landing";
  }, []);

  return (
    <Root>
      <Confirm
        message={state.confirm.message}
        error={state.confirm.error}
        title={state.confirm.title}
        onClick={state.confirm.onClick}
      />
      <div className="landing">
        <div>
          <img src={image.logo} alt="" />
        </div>

        <div className="title">
          <h1>Prueba de Desarrollo Sigma</h1>
        </div>

        <div className="text">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero vel
            sed reiciendis officia, illo atque numquam alias non dolore incidunt
            excepturi consequuntur aut omnis assumenda nesciunt. Quis nulla
            omnis neque.
          </p>
        </div>

        <div className="main">
          <div>
            <img width={400} height={400} src={image.extra} alt="" />
          </div>
          <div>
            <Person
              disabled={state.isLoading}
              colombia={state.colombia}
              onRequired={http.insertPerson}
            />
          </div>
        </div>
      </div>
    </Root>
  );
}
