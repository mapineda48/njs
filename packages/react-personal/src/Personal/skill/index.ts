import { FaReact, FaHtml5 } from "react-icons/fa";
import {
  SiTypescript,
  SiRedux,
  SiPostgresql,
  SiMongodb,
  SiVueDotJs,
} from "react-icons/si";
import { IoLogoJavascript, IoLogoCss3, IoLogoSass } from "react-icons/io";
import { DiNodejs } from "react-icons/di";
import { MdHelpOutline } from "react-icons/md";
import * as image from "./image";
import { IconType } from "react-icons";

export const html: Skill = {
  title: "Html",
  image: image.html,
  Icon: FaHtml5,
  url: "https://www.w3.org/html/",
};

export const css: Skill = {
  title: "Css",
  image: image.css,
  Icon: IoLogoCss3,
  url: "https://www.w3.org/Style/CSS/",
};

export const scss: Skill = {
  title: "Sass",
  image: image.sass,
  Icon: IoLogoSass,
  url: "https://sass-lang.com/",
};

export const styled: Skill = {
  title: "Styled",
  image: image.styled,
  Icon: MdHelpOutline,
  url: "https://www.styled-components.com/",
};

export const javascript: Skill = {
  title: "Javascript",
  image: image.js,
  Icon: IoLogoJavascript,
  url: "https://en.wikipedia.org/wiki/JavaScript",
};

export const typescript: Skill = {
  title: "Typescript",
  image: image.ts,
  Icon: SiTypescript,
  url: "https://www.typescriptlang.org/",
};

export const react: Skill = {
  title: "React",
  image: image.react,
  Icon: FaReact,
  url: "https://reactjs.org/",
};

export const mui: Skill = {
  title: "Mui",
  image: image.mui,
  Icon: MdHelpOutline,
  url: "foo",
};

export const vue: Skill = {
  title: "Vue",
  image: image.vue,
  Icon: SiVueDotJs,
  url: "https://vuejs.org/",
};

export const redux: Skill = {
  title: "Redux",
  image: image.redux,
  Icon: SiRedux,
  url: "https://redux.js.org/",
};

export const node: Skill = {
  title: "NodeJs",
  image: image.node,
  Icon: DiNodejs,
  url: "https://nodejs.org/en/",
};

export const postgres: Skill = {
  title: "PostgreSQL",
  image: image.postgres,
  Icon: SiPostgresql,
  url: "https://www.postgresql.org/",
};

export const mongo: Skill = {
  title: "MongoDB",
  image: image.mongo,
  Icon: SiMongodb,
  url: "https://www.mongodb.com/",
};

export const express: Skill = {
  title: "ExpressJS",
  image: image.express,
  Icon: MdHelpOutline,
  url: "https://expressjs.com/",
};

/**
 * Types
 */
export interface Skill {
  title: string;
  url: string;
  image: string;
  Icon: IconType;
}
