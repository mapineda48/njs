import Loading from "../../Loading";
import Confirm from "../Confirm";
import { useState } from "../state/Context";
import type { State, Confirm as IConfirm } from "../state";

function ConfirmView(props: any) {
  return (
    <div className="space-center">
      <Confirm {...props} />
    </div>
  );
}

function createMap() {
  const map = new Map();

  const set = (type: string, Component: FElement) => {
    map.set(type, Component);
  };

  const get = (type: string) => {
    const Current = map.get(type);

    if (Current) return Current;

    return () => <div>Not found {type}</div>;
  };

  return { set, get };
}

/**
 * Create Function Component View
 */
function createView(opt: OptView): View;
function createView(opt: Selector): Views;
function createView(opt: OptViews): Views & Core;
function createView(opt: any): any {
  const isSelector = typeof opt === "function";

  if (isSelector) {
    const { set, get } = createMap();

    const View: any = () => {
      const [state] = useState();

      const Component = get(opt(state));

      return <Component />;
    };

    View.set = set;

    return View;
  }

  const { Component, selector, isLoading, confirm } = opt;

  if (Component) {
    const View: any = () => {
      const [state] = useState();

      if (isLoading(state)) {
        return <View.Loading />;
      }

      const ConfirmView = confirm(state);

      if (ConfirmView) {
        return <View.Confirm {...ConfirmView} />;
      }

      return <Component />;
    };

    View.Loading = Loading;

    View.Confirm = ConfirmView;

    return View;
  }

  const { set, get } = createMap();

  const View: any = () => {
    const [state] = useState();

    if (isLoading(state)) return <View.Loading />;

    const ConfirmView = confirm(state);

    if (ConfirmView) return <View.Confirm {...ConfirmView} />;

    const Component = get(selector(state));

    return <Component />;
  };

  View.Loading = Loading;

  View.Confirm = ConfirmView;

  View.set = set;

  return View;
}

export default createView;

/**
 * Types
 */
interface Opt {
  confirm: (state: State) => IConfirm;
  isLoading: (state: State) => boolean;
}

interface OptView extends Opt {
  Component: () => JSX.Element | null;
}

type Selector = (state: State) => string;

interface OptViews extends Opt {
  selector: Selector;
}

interface Core {
  Loading: () => JSX.Element;
  Confirm: typeof Confirm;
}

interface View extends Core {
  (): JSX.Element | null;
}

interface Views {
  (): JSX.Element;
  set: (type: string, Component: () => JSX.Element | null) => void;
}

type FElement = () => JSX.Element;
