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

const html: Meta = {
  title: "HTML",
  image: "/images/html.png",
  url: "https://www.w3.org/html/",
};

const css: Meta = {
  title: "CSS",
  image: "/images/css.png",
  url: "https://www.w3.org/Style/CSS/",
};

const scss: Meta = {
  title: "SCSS",
  image: "/images/sass.png",
  url: "https://sass-lang.com/",
};

const styled: Meta = {
  title: "Styled",
  image: "/images/styled.png",
  url: "https://www.styled-components.com/",
};

const js: Meta = {
  title: "Javascript",
  image: "/images/js.png",
  url: "https://en.wikipedia.org/wiki/JavaScript",
};

const ts: Meta = {
  title: "Typescript",
  image: "/images/ts.png",
  url: "https://www.typescriptlang.org/",
};

const react: Meta = {
  title: "ReactJs",
  image: "/images/react.png",
  url: "https://reactjs.org/",
};

const mui: Meta = {
  title: "Mui",
  image: "/images/mui.png",
  url: "foo",
};

const vue: Meta = {
  title: "VueJs",
  image: "/images/vue.png",
  url: "https://vuejs.org/",
};

const redux: Meta = {
  title: "ReduxJs",
  image: "/images/redux.png",

  url: "https://redux.js.org/",
};

const node: Meta = {
  title: "NodeJs",
  image: "/images/node.png",
  url: "https://nodejs.org/en/",
};

const postgres: Meta = {
  title: "PostgreSQL",
  image: "/images/postgres.png",
  url: "https://www.postgresql.org/",
};

const mongo: Meta = {
  title: "MongoDB",
  image: "/images/mongo.png",

  url: "https://www.mongodb.com/",
};

const express: Meta = {
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

const _icon: _Icon = {
  html: FaHtml5,
  css: IoLogoCss3,
  scss: IoLogoSass,
  styled: MdHelpOutline,
  js: IoLogoJavascript,
  ts: SiTypescript,
  react: FaReact,
  mui: MdHelpOutline,
  vue: SiVueDotJs,
  redux: SiRedux,
  node: DiNodejs,
  postgres: SiPostgresql,
  mongo: SiMongodb,
  express: MdHelpOutline,
};

export const icon: Icon = _icon;

/**
 * Types
 */
export interface Meta {
  title: string;
  url: string;
  image: string;
}

export type Key = keyof Skill;

export type Skill = typeof skill;

type _Icon = {
  [K in keyof Skill]: IconType;
};

export type Icon = { [K: string]: IconType };
