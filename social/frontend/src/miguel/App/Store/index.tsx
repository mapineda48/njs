import { Provider } from "react-redux";
import store from "./store";
import { Dispatch } from "./hook";

/**
 * https://redux.js.org/tutorials/quick-start#create-a-redux-store
 */

export default function Redux(props: Props) {
  return (
    <Provider store={store}>
      <Dispatch>{props.children}</Dispatch>
    </Provider>
  );
}

/**
 * Types
 */

interface Props {
  children: React.ReactNode;
}
