import React from "react";

import "./index.scss";

/**
 * https://www.cssportal.com/css3-flip-switch/
 */
export const FlipSwitch: TFlipSwitch = ({ onClick }) => {
  return (
    <div className="view-invoice-flipswitch">
      <input
        type="checkbox"
        name="view-invoice-flipswitch"
        className="view-invoice-flipswitch-cb"
        id="fs"
        defaultChecked
        onClick={onClick}
      />
      <label className="view-invoice-flipswitch-label" htmlFor="fs">
        <div className="view-invoice-flipswitch-inner" />
        <div className="view-invoice-flipswitch-switch" />
      </label>
    </div>
  );
};

export default FlipSwitch;

/**
 * Typings
 */

interface PropFlipSwitch {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

type TFlipSwitch = (prop: PropFlipSwitch) => JSX.Element;
