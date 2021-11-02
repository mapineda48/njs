import image from "../img";
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
import { IconType } from "react-icons";

const html: Skill = {
  Icon: FaHtml5,
  title: "HTML",
  image: image.html,
  url: "https://www.w3.org/html/",
};

const css: Skill = {
  Icon: IoLogoCss3,
  title: "CSS",
  image: image.css,
  url: "https://www.w3.org/Style/CSS/",
};

const scss: Skill = {
  Icon: IoLogoSass,
  title: "SCSS",
  image: image.sass,
  url: "https://sass-lang.com/",
};

const styled: Skill = {
  Icon: MdHelpOutline,
  title: "Styled",
  image: image.styled,
  url: "https://www.styled-components.com/",
};

const js: Skill = {
  Icon: IoLogoJavascript,
  title: "Javascript",
  image: image.js,
  url: "https://en.wikipedia.org/wiki/JavaScript",
};

const ts: Skill = {
  Icon: SiTypescript,
  title: "Typescript",
  image: image.ts,
  url: "https://www.typescriptlang.org/",
};

const react: Skill = {
  Icon: FaReact,
  title: "ReactJs",
  image: image.react,
  url: "https://reactjs.org/",
};

const mui: Skill = {
  Icon: MdHelpOutline,
  title: "Mui",
  image: image.mui,
  url: "https://mui.com/",
};

const vue: Skill = {
  Icon: SiVueDotJs,
  title: "VueJs",
  image: image.vue,
  url: "https://vuejs.org/",
};

const redux: Skill = {
  Icon: SiRedux,
  title: "ReduxJs",
  image: image.redux,
  url: "https://redux.js.org/",
};

const node: Skill = {
  Icon: DiNodejs,
  title: "NodeJs",
  image: image.node,
  url: "https://nodejs.org/en/",
};

const postgres: Skill = {
  Icon: SiPostgresql,
  title: "PostgreSQL",
  image: image.postgres,
  url: "https://www.postgresql.org/",
};

const mongo: Skill = {
  Icon: SiMongodb,
  title: "MongoDB",
  image: image.mongo,
  url: "https://www.mongodb.com/",
};

const express: Skill = {
  Icon: MdHelpOutline,
  title: "ExpressJs",
  image: image.express,
  url: "https://expressjs.com/",
};

export const skill = {
  html,
  css,
  js,
  ts,
  styled,
  vue,
  scss,
  react,
  mui,
  redux,
  node,
  express,
  mongo,
  postgres,
};

export default skill;

/**
 * Types
 */
export interface Skill {
  Icon: IconType;
  title: string;
  url: string;
  image: string;
}
