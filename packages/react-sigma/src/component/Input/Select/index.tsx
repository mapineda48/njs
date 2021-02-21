import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { createPopper, PropsContent } from "mapineda-react/Popper";

import style from "./index.module.scss";

const Options = createPopper(({ popper, options, onClick }: OProps) => {
  return (
    <div ref={popper} className={`popper panel popper-list ${style.options} `}>
      {options.map((option,index) => {
        return <div key={index} onClick={() => onClick(option)}>{option}</div>;
      })}
      <div data-popper-arrow className="arrow"></div>
    </div>
  );
});

export default function Input(props: Props) {
  const { onChange, options, ...rest } = props;

  const value = rest.value?.toString() || "";

  React.useEffect(() => {
    if (!options.includes(value)) {
      onChange(options[0]);
    }
  });

  const Input = React.createElement("input", {
    ...rest,
    value,
    readOnly: true,
    className: "input",
  });

  if (rest.readOnly) {
    return Input;
  }

  return (
    <Options options={options} onClick={onChange}>
      <div className={style._}>
        <IoIosArrowDown />
        {Input}
      </div>
    </Options>
  );
}

/**
 * Types
 */
type NativeProps = JSX.IntrinsicElements["input"];

interface Props extends Omit<NativeProps, "ref" | "onChange"> {
  onChange: (value: string) => void;
  options: string[];
}

interface OProps extends PropsContent {
  options: string[];
  onClick: (value: string) => void;
}
