import React from "react";
import ReactDOM from "react-dom";
import {
  createPopper as createCorePopper,
  Options,
  Instance,
} from "@popperjs/core";

function useEvent(popper: CB, current?: CB) {
  return React.useMemo(() => {
    if (!current) return popper;

    return (event: any) => {
      popper(event);
      current(event);
    };
  }, [popper, current]);
}

/**
 * https://popper.js.org/docs/v2/tutorial
 */

export function Popper(props: PropsMain) {
  const {
    enabled,
    options,
    Content,
    children,
    onDisplay,
    container = document.body,
    ...rest
  } = props;

  if (!React.isValidElement(children)) {
    throw new Error("invalid popper target");
  }

  /**
   * maybe with the shipping reference it will be compatible
   * https://reactjs.org/docs/forwarding-refs.html
   */
  if (typeof children.type !== "string") {
    throw new Error("react component type (class or function) unsupported");
  }

  const target = React.useRef<HTMLElement>(null);

  const popper = React.useRef<HTMLElement>(null);

  const [active, setActive] = React.useState(false);

  const isManual = enabled !== undefined;

  const isEnabled = isManual ? enabled : active;

  React.useEffect(() => {
    if (!target.current || !popper.current || !isEnabled) {
      return;
    }

    let instance = createCorePopper(target.current, popper.current, options);

    /**
     * all ready to display the popper
     */
    popper.current.style.display = "";

    if (onDisplay) {
      onDisplay(instance);
    }

    return () => {
      instance.destroy();
      instance = null as any;
    };
  }, [isEnabled, onDisplay, options]);

  const show = React.useCallback(() => setActive(true), []);

  const hidden = React.useCallback(() => setActive(false), []);

  const setPopper = React.useCallback((ref: HTMLElement | null) => {
    if (!ref) return;

    /**
     * wait until the popper is ready to display
     */
    ref.style.display = "none";

    (popper as any).current = ref;
  }, []);

  const propsChild = children.props;

  /**
   * Events Handler
   */

  const onMouseEnter = useEvent(show, propsChild.onMouseOver);
  const onMouseLeave = useEvent(hidden, propsChild.onMouseOut);
  const onTouchStart = useEvent(show, propsChild.onFocus);

  /**
   * Create new instance target
   */

  let propsTarget: any = {
    ...propsChild,
    key: children.key || "_target",
    ref: target,
  };

  if (!isManual) {
    propsTarget = { ...propsTarget, onMouseEnter, onMouseLeave, onTouchStart };
  }

  const Type = children.type;

  const Target = <Type {...propsTarget} />;

  if (!isEnabled) {
    return Target;
  }

  const Popper = (
    <Content
      {...rest}
      key={`popper-${Date.now()}`}
      popper={setPopper}
      close={hidden}
    />
  );

  return (
    <>
      {Target}
      {ReactDOM.createPortal(Popper, container)}
    </>
  );
}

function createPopper(Content: any, container: any) {
  function WrapPopper(props: any) {
    return (
      <Popper
        {...props}
        Content={Content}
        options={WrapPopper.options}
        container={container}
      />
    );
  }

  WrapPopper.options = {};

  return WrapPopper;
}

export default createPopper as Create;

/**
 * Types
 */
export type { Instance, Options };

interface PropsMain {
  enabled?: boolean;
  options?: Partial<Options>;
  onDisplay?: OnDisplay;
  container?: HTMLElement;
  Content: (props: Props) => JSX.Element | null;
  children: React.ReactNode;
}

type CB = (...args: any) => void;

type Create = <T extends Props>(
  CB: (props: T) => JSX.Element | null,
  container?: HTMLElement
) => {
  (props: PropsPipe<T>): JSX.Element;
  options: Partial<Options>;
};

type PropsPipe<T> = keyof Omit<T, keyof Props> extends never
  ? ExtProps
  : ExtProps & Omit<T, keyof Props>;

interface ExtProps {
  enabled?: boolean;
  onDisplay?: OnDisplay;
  children: JSX.Element;
}

export interface Props {
  popper: (ref: HTMLElement | null) => void;
  close: () => void;
}

type OnDisplay = (instance: Instance) => void;
