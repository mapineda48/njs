import { useField } from "./Field";
import React from "react";

export default function InputFile(props: Props) {
  const { fieldName, listIndex, ...inputProps } = props;

  const [, setState] = useField({
    fieldName,
    listIndex,
  });

  return (
    <input
      {...inputProps}
      type="file"
      onChange={({ target }) => {
        const { files } = target;

        if (!files) {
          return;
        }

        const file = files.item(0);

        setState(file);
      }}
    />
  );
}

/**
 * Types
 */

interface Props extends CoreProps {
  fieldName: string;
  listIndex?: number;
}

type CoreProps = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
