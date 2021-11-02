import type { Model } from "./Web";

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
  home: `
  Desarrollador de software fullstack con buen dominio de NodeJs, 
  implementación de API Rest, diseño de PWA, SPA,SSR, etc, con 
  librerías tales como ReactJs y/o frameworks como AngularJs, control 
  de versiones mediante Git, siempre en busca de nuevos retos que le 
  permiten seguir creciendo como profesional.
  `,
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
  home: `
  Fullstack software developer with good command of NodeJs,
  API Rest implementation, PWA design, SPA, SSR, etc, with
  libraries such as ReactJs and / or frameworks such as AngularJs, control
  versions using Git, always looking for new challenges that
  allow you to continue growing as a professional.
  `,
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
