import {
  MutableRefObject,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
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

export const Form = createContext<any>(null);

export function useForm<S = any>() {
  const ref = useContext(Form);

  if (!ref) {
    throw new Error("Missing form context");
  }

  return ref as [IForm<S>, (data: S) => void];
}

export default function FormProvider<T>(props: Props<T>) {
  const [state, setState] = useState(setForm);

  const updateForm = useCallback((form: any) => setState(setForm(form)), []);

  useMemo(() => {
    if (!props.state) {
      return;
    }

    updateForm(props.state);
  }, [props.state, updateForm]);

  const onSubmit = useRef<any>(props.onSubmit);

  return (
    <Submit.Provider value={onSubmit}>
      <Form.Provider value={[state, updateForm]}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            //console.log(state);
            const data = parseForm(state);
            //console.log(data);
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

export type IForm<T> = {
  [K in keyof T]: T[K] extends (infer I)[] ? FormArray<I> : T[K];
};

export interface FormArray<T> extends Array<T> {
  addItem: (...values: T[]) => void;
  removeIndex: (index: number) => void;
}
