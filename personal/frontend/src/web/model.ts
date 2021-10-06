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
  en equipo y adaptabilidad a lo requerido a cada contexto.`,
  demos: {
    sigma: `
    Aqui veras en el frontend la implementación de una SPA con un espectacular 
    landing que le permite al publico registra su informacion para algun tipo 
    de solicitud además para administrar toda esta información su correspondiente 
    interfaz CRUD, estas vistas tan agradables desarrolladas con reactjs; 
    el backend corre sobre nodejs, las solicitudes manejadas mediante expressjs, 
    la información es almacenada en una base de datos relacional, 
    para este demos postgreSQL.
    `,
    grants: `
    Expone las oportunidades del grants y a pesar de no de relucir con una 
    interfaz gráfica muy llamativa, ten presente que es un SSR de una SPA 
    con reactjs, fue desarrollado con fines educativos que me llevo apreciar 
    aún más el valor que tiene los proyectos como los que llevan el equipo 
    de Nextjs
    `,
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
    Here you will see in the frontend the implementation of a SPA with a 
    spectacular landing that allows the public to register their information 
    for some type of request, as well as to manage all this information its 
    corresponding CRUD interface, these pleasant views developed with reactjs; 
    the backend runs on nodejs, requests handled through expressjs, 
    the information is stored in a relational database, for this demo use
    postgreSQL.
    `,
    grants: `
    It exposes the grant opportunities and despite not shining with a 
    very striking graphical interface, keep in mind that it is an 
    SSR of a SPA with reactjs, it was developed for educational purposes 
    that led me to appreciate even more the value of projects such as those 
    that they carry the Nextjs team
    `,
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
