import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import Root from "component/Root";
import { useState } from "../state/Context";
import createView from "../View";
import Workspace from "./Workspace";

function Dashboard() {
  const [state, admin] = useState();

  return (
    <Root>
      <div className="actions">
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
