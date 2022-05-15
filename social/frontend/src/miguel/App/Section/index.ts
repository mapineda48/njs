import { SiGooglemessages } from "react-icons/si";
import { BiUserCircle } from "react-icons/bi";
import Room from "./Room";
import Guest from "./Guest";
import type { IconType } from "react-icons";

const sections: Section[] = [
  {
    Icon: SiGooglemessages,
    MainContent: Room,
  },
  {
    Icon: BiUserCircle,
    MainContent: Guest,
  },
];

export default sections;

/**
 * Types
 */

export type JSXFunctional = () => JSX.Element | null;

export type Section = {
  Icon: IconType;
  MainContent: JSXFunctional;
};
