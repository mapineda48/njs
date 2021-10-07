import React from "react";
import clsx from "clsx";
import createPopper, { Props as PropsContent } from "mp48-react/Popper";
import style from "./index.module.scss";

export function createTooltip() {
  const Tooltip = createPopper(({ popper, content, className }: Props) => {
    return (
      <div className={clsx([style.tooltip, className])} ref={popper}>
        {content}
        <div className={style.arrow} data-popper-arrow></div>
      </div>
    );
  });

  Tooltip.options = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  };

  return Tooltip;
}

/**
 * Types
 */

interface Props extends PropsContent {
  className?: string;
  content: string;
}
