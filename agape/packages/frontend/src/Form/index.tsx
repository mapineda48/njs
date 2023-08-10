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
  const { state: initialState, onSubmit, ...formProps } = props;

  const [state, setState] = useState(setForm);

  const updateForm = useCallback((form: any) => setState(setForm(form)), []);

  useMemo(() => {
    if (!props.state) {
      return;
    }

    updateForm(props.state);
  }, [props.state, updateForm]);

  const ref = useRef<any>(onSubmit);

  return (
    <Submit.Provider value={ref}>
      <Form.Provider value={[state, updateForm]}>
        <form
          {...formProps}
          onSubmit={(event) => {
            event.preventDefault();
            // console.log(state);
            const data = parseForm(state);
            // console.log(data);
            ref?.current(data);
          }}
        />
      </Form.Provider>
    </Submit.Provider>
  );
}

/**
 * Types
 */

export type IForm<T> = {
  [K in keyof T]: T[K] extends (infer I)[] ? FormArray<I> : T[K];
};

export interface FormArray<T> extends Array<T> {
  addItem: (...values: T[]) => void;
  removeIndex: (index: number) => void;
}

interface Props<T> extends CoreProps {
  state?: T;
  onSubmit?: (state: T) => void;
}

type CoreProps = Omit<JSX.IntrinsicElements["form"], "ref" | "onSubmit">;
