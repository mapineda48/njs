import useState from "./state";
import Context from "./Context";
import Loading from "../Loading";
import Dialog from "../Dialog";

export default function App(props: Props) {
  const [state, app, http] = useState();

  if (state.isLoading) {
    return <Loading />;
  }

  if (state.dialog) {
    return <Dialog {...state.dialog} />;
  }

  if (state.sync) {
    return (
      <Context state={state} app={app} http={http}>
        {props.children}
      </Context>
    );
  }

  return null;
}

/**
 * Types
 */
interface Props {
  children: any;
}
