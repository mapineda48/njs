import { ReactNode, createContext, useContext, useEffect } from "react";

const Context = createContext("");

export function useSection() {
  return useContext(Context);
}

export function Provider(props: Props) {
  const sectionName = useContext(Context);

  useEffect(() => {
    if (!sectionName) {
      return;
    }

    throw new Error("Unsupport nested sections");
  });

  return (
    <Context.Provider value={props.fieldName}>
      {props.children}
    </Context.Provider>
  );
}

/**
 * Types
 */
export interface Props {
  children: ReactNode;
  fieldName: string;
}
