import React from "react";
import { FiHelpCircle } from "react-icons/fi";
import Root from "../components/Root";
import { createTooltip } from "../components/Tooltip";
import Switch from "./Switch";
import { render } from "../common";
import useState from "./state";
import socket from "./socket";
import "./index.scss";

const Help = createTooltip();

Help.options = {
  ...Help.options,
  placement: "left",
};

render(<Admin />);

function Admin() {
  const [state, admin, http] = useState();

  React.useMemo(() => socket(admin), [admin]);

  React.useEffect(() => {
    window.document.title = "Admin";
    http.fetchState();
  }, [http]);

  return (
    <Root>
      <main className="main">
        <div className="admin">
          <Help
            auto
            portal
            content="The first thing I think you think of when you see that this is possible with an admin panel without authentication, but be patient, it is still in development."
            className="admin-help"
          >
            <div className="help">
              <FiHelpCircle />
            </div>
          </Help>
          <h2>Admin Panel</h2>
          <div>
            <Switch
              active={state.maps.active}
              isLoading={state.maps.isLoading}
              message={state.maps.message}
              onChange={http.setMaps}
            >
              Enabled Source Maps
            </Switch>
          </div>
        </div>
      </main>
    </Root>
  );
}

/**
 * Types
 */
