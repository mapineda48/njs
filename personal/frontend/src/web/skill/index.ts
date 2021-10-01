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
  image: "/images/html.png",
  url: "https://www.w3.org/html/",
};

const css: Skill = {
  Icon: IoLogoCss3,
  title: "CSS",
  image: "/images/css.png",
  url: "https://www.w3.org/Style/CSS/",
};

const scss: Skill = {
  Icon: IoLogoSass,
  title: "SCSS",
  image: "/images/sass.png",
  url: "https://sass-lang.com/",
};

const styled: Skill = {
  Icon: MdHelpOutline,
  title: "Styled",
  image: "/images/styled.png",
  url: "https://www.styled-components.com/",
};

const js: Skill = {
  Icon: IoLogoJavascript,
  title: "Javascript",
  image: "/images/js.png",
  url: "https://en.wikipedia.org/wiki/JavaScript",
};

const ts: Skill = {
  Icon: SiTypescript,
  title: "Typescript",
  image: "/images/ts.png",
  url: "https://www.typescriptlang.org/",
};

const react: Skill = {
  Icon: FaReact,
  title: "ReactJs",
  image: "/images/react.png",
  url: "https://reactjs.org/",
};

const mui: Skill = {
  Icon: MdHelpOutline,
  title: "Mui",
  image: "/images/mui.png",
  url: "foo",
};

const vue: Skill = {
  Icon: SiVueDotJs,
  title: "VueJs",
  image: "/images/vue.png",
  url: "https://vuejs.org/",
};

const redux: Skill = {
  Icon: SiRedux,
  title: "ReduxJs",
  image: "/images/redux.png",

  url: "https://redux.js.org/",
};

const node: Skill = {
  Icon: DiNodejs,
  title: "NodeJs",
  image: "/images/node.png",
  url: "https://nodejs.org/en/",
};

const postgres: Skill = {
  Icon: SiPostgresql,
  title: "PostgreSQL",
  image: "/images/postgres.png",
  url: "https://www.postgresql.org/",
};

const mongo: Skill = {
  Icon: SiMongodb,
  title: "MongoDB",
  image: "/images/mongo.png",

  url: "https://www.mongodb.com/",
};

const express: Skill = {
  Icon: MdHelpOutline,
  title: "ExpressJs",
  image: "/images/express.png",
  url: "https://expressjs.com/",
};

export const skill = {
  html,
  css,
  js,
  scss,
  ts,
  styled,
  react,
  mui,
  redux,
  vue,
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
