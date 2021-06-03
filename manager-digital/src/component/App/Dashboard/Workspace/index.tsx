import * as view from "component/App/state/view";
import createView from "component/App/View";
import Create from "./Create";
import Search from "./Search";
import style from "./index.module.scss";

const Workspace = createView((state) => state.current);

Workspace.set(view.WELCOME, () => {
  return (
    <div className={"space-center " + style._}>
      <h3>Please select some task on left panel to continue</h3>
    </div>
  );
});

Workspace.set(view.SEARCH, Search);

Workspace.set(view.CREATE, Create);

export default Workspace;
