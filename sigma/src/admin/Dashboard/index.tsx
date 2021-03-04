import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import Root from "components/Root";
import { useState } from "../state/Context";
import createView from "../View";
import Workspace from "./Workspace";

function Dashboard() {
  const [state, admin, http] = useState();

  const shouldFetchColombia =
    !state.colombia && !state.isLoading && !state.confirm;

  React.useEffect(() => {
    if (!shouldFetchColombia) return;

    http.fetchColombia();
  }, [http, shouldFetchColombia]);

  if (!state.colombia) return null;

  return (
    <Root>
      <div className="options">
        <ul>
          <li onClick={admin.welcome}>
            <AiFillHome />
          </li>
          <li onClick={admin.goSearch}>
            {state.search.shouldClose ? <FaTimes /> : <FaSearch />}
          </li>
          <li>
            <IoMdPersonAdd onClick={admin.goCreate} />
          </li>
        </ul>
      </div>
      <div className="workspace flex-full">
        <Workspace />
      </div>
    </Root>
  );
}

export default createView({
  Component: Dashboard,
  isLoading: (state) => state.isLoading,
  confirm: (state) => state.confirm,
});
