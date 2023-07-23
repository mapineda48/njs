import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { parseForm, setForm } from "./util";

export const Submit = createContext<MutableRefObject<any> | null>(null);

export function useSubmit<S = any>(onSubmit: (form: S) => void) {
  const cb = useContext(Submit);

  useEffect(() => {
    if (!cb) {
      return;
    }

    if (cb.current && cb.current !== onSubmit) {
      throw new Error("Only supports one submit handler");
    }

    cb.current = onSubmit;

    return () => {
      cb.current = null;
    };
  }, [cb, onSubmit]);
}

export const Form = createContext<MutableRefObject<any> | null>(null);

export function useForm() {
  const ref = useContext(Form);

  if (!ref) {
    throw new Error("Missing form context");
  }

  return ref;
}

export default function FormProvider<T>(props: Props<T>) {
  const { state } = props;
  const ref = useRef<any>(useMemo(() => setForm(state), [state]));

  const onSubmit = useRef<any>(props.onSubmit);

  return (
    <Submit.Provider value={onSubmit}>
      <Form.Provider value={ref}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const data = parseForm(ref.current);
            console.log(data);
            onSubmit?.current(data);
          }}
        >
          {props.children}
        </form>
      </Form.Provider>
    </Submit.Provider>
  );
}

/**
 * Types
 */

interface Props<T> {
  children: ReactNode;
  state?: T;
  onSubmit?: (state: T) => void;
}
