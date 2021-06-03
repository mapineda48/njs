import React from "react";
import { useDispatch } from "store/hook";

export const useWhere = () => {
  const [state, setState] = React.useState<State>({
    where: {
      column: "",
      value: "",
    },
  });

  const { management } = useDispatch();

  const set = React.useCallback(
    (input: Input) => {
      const [[column, value]] = Object.entries(input);

      setState({ where: { column, value: "" + value } });
    },
    [setState]
  );

  const get = React.useCallback(() => {
    return management.get(state as any);
  }, [state, management]);

  return [set, get, state] as const;
};

/**
 * Typings
 */
type Input = { [K: string]: any };

interface Where {
  column: string;
  value: any;
}

interface State {
  where: Where;
}
