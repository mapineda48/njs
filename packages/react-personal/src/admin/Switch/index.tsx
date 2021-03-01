import React from "react";
import { createTooltip } from "../../components/Tooltip";

const Message = createTooltip();

Message.options = { ...Message.options, placement: "top" };

export default function Switch(props: Props) {
  const { active, isLoading, message, children, onChange } = props;

  return (
    <div className="custom-control custom-switch">
      <Message portal enabled={!!message} content={message}>
        <input
          type="checkbox"
          className="custom-control-input"
          id={children}
          checked={active}
          disabled={isLoading}
          onChange={() => onChange(!active)}
        />
      </Message>
      <label className="custom-control-label" htmlFor={children}>
        {children}
      </label>
    </div>
  );
}

/**
 * Types
 */
export interface Base {
  active: boolean;
  isLoading: boolean;
  message: string;
}

export interface Props extends Base {
  children: string;
  onChange: (active: boolean) => void;
}
