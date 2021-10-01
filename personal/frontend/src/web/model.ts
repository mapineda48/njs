import type { Model } from "./Personal";

export const es: Model = {
  title: "Bienvenido - Miguel Angel Pineda Vega",
  lang: {
    current: "es",
    next: "en",
    title: "Cambiar Idioma",
  },
  nav: {
    home: "Inicio",
    skill: "Habilidades",
    demos: "Demos",
  },
  description: `
  Desarrollador nodejs full-stack, con conocimientos: progressive web
  app, single pages application,server side render, web microservice;
  adicionalmente manejo básico de repositorios git (github),
  intermedio en el desarrollo de interfaces de usuario con reactjs,
  capaz de trabajar bajo los paradigmas de programación funcional
  dirigida por eventos, orientada a objetos, estructura; me considero
  apasionado por el mundo de la informática por ello siempre busco
  mantenerme al día con lo último en tecnología, capacidad de trabajo
  en equipo y adaptabilidad a lo requerido a cada contexto.`.replace(
    /\n/g,
    " "
  ),
  demos: {
    sigma: `
    El backend ademas expone una api restful que permite el CRUD de la clase persona 
    en la base de datos y el frontend desarrollado en reactjs que consume las api 
    previamente mensionadas.`,
  },
  card: {
    go: "Ir",
    back: "Volver",
    help: "Ayudar",
  },
  source: "El código fuente tiene licencia",
  license: "contenido del sitio web tiene licencia",
};

export const en: Model = {
  title: "Welcome - Miguel Angel Pineda Vega",
  lang: {
    current: "en",
    next: "es",
    title: "change idiom to spanish",
  },
  nav: {
    home: "Home",
    skill: "Skill",
    demos: "Demos",
  },
  description: `
  Full-stack nodejs developer, with knowledge: progressive web
  app, single pages application, server side render, web microservice;
  additionally basic handling of git repositories (github),
  intermediate in the development of user interfaces with reactjs,
  able to work under functional programming paradigms
  event-driven, object-oriented, structure; I consider myself
  passionate about the world of computing that's why I always look for
  keep up to date with the latest technology, work capacity
  in team and adaptability to what is required to each context.`,
  demos: {
    sigma: `
    Point of sale for stationery in which a SPA with reactjs was implemented,
    consumes a rest API on the backend that allows CRUD on the database.`,
  },
  card: {
    go: "Go",
    back: "Back",
    help: "Help",
  },
  source: "The source code is licensed",
  license: "website content is licensed",
};

const data = { es, en };

export default data;

/**
 * Types
 */

export type Data = typeof data;
