import image from "../img";
import { FaReact, FaHtml5, FaJava } from "react-icons/fa";
import {
  SiTypescript,
  SiRedux,
  SiPostgresql,
  SiMongodb,
  SiVuedotjs,
  SiSwagger,
  SiSequelize,
  SiExpress,
  SiStyledcomponents,
  SiMaterialui,
  SiCsharp,
  SiSpringboot,
} from "react-icons/si";
import { IoLogoJavascript, IoLogoCss3, IoLogoSass } from "react-icons/io";
import { DiNodejs } from "react-icons/di";
import { IconType } from "react-icons";

const csharp: Skill = {
  Icon: SiCsharp,
  title: "C#",
  image: image.cSharp,
  url: "https://docs.microsoft.com/en-us/dotnet/csharp/",
};

const springBoot: Skill = {
  Icon: SiSpringboot,
  title: "SpringBoot",
  image: image.springBoot,
  url: "https://spring.io/",
};

const java: Skill = {
  Icon: FaJava,
  title: "Java",
  image: image.java,
  url: "https://www.java.com/",
};

const sequelize: Skill = {
  Icon: SiSequelize,
  title: "Sequelize",
  image: image.sequelize,
  url: "https://sequelize.org/",
};

const swagger: Skill = {
  Icon: SiSwagger,
  title: "Swagger",
  image: image.swagger,
  url: "https://swagger.io/",
};

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
  Icon: SiStyledcomponents,
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
  Icon: SiMaterialui,
  title: "Mui",
  image: image.mui,
  url: "https://mui.com/",
};

const vue: Skill = {
  Icon: SiVuedotjs,
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
  Icon: SiExpress,
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
  sequelize,
  swagger,
  mongo,
  postgres,
  java,
  springBoot,
  csharp,
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
