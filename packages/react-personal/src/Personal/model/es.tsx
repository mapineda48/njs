import { skill, label, link, Model } from ".";

export const model: Model = {
  title: "Bienvenido - Miguel Angel Pineda Vega",
  nav: {
    home: "Inicio",
    skill: "Habilidades",
    demo: "Demos",
    lang: {
      current: "es",
      title: "Cambiar Idioma",
      href: "/",
      next: "EN",
    },
  },
  main: {
    home: {
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
    },
    demos: [
      {
        project: "Agape",
        description: `
        Punto de venta para papeleria en el cual se puso en práctica una SPA con reactjs, 
        consume una API rest en el backend que permite CRUD en la base de datos.`,
        skills: skill.agape,
        url: link.agape,
        label: label.es,
      },
      {
        project: "Grants",
        description: `
        El backend redirecciona "grants/search" y el frontend con reactjs expone las oportunidades.`,
        skills: skill.grants,
        url: link.grants,
        label: label.es,
      },
      {
        project: "Sigma",
        description: `
        El backend ademas expone una api restful que permite el CRUD de la clase persona 
        en la base de datos y el frontend desarrollado en reactjs que consume las api 
        previamente mensionadas.`,
        skills: skill.sigma,
        url: link.sigma.landing,
        label: label.es,
      },
      {
        project: "Valiu",
        description: `
        Crea una etiqueta con un nombre y asigna un color aleatorio, 
        la etiqueta se inserta al principio de la lista, edita el nombre de la etiqueta, 
        quita la etiqueta, sincroniza la lista en tiempo real en todos los clientes. 
        Si el cliente A agrega una etiqueta "Foo", 
        entonces el cliente B debe actualizar su lista en tiempo real para 
        agregar la nueva etiqueta "Foo" a la parte superior de la lista, 
        también todos los cambios como ediciones y eliminaciones de elementos.`,
        skills: skill.valiu,
        url: link.valiu,
        label: label.es,
      },
    ],
  },
  footer: {
    source: "El código fuente tiene licencia",
    web: "contenido del sitio web tiene licencia",
  },
};

export const en: Model = {
  title: "Welcome - Miguel Angel Pineda Vega",
  nav: {
    home: "Home",
    skill: "Skills",
    demo: "Demos",
    lang: {
      current: "en",
      title: "Change Idiom",
      next: "ES",
      href: "/es",
    },
  },
  main: {
    home: {
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
    },
    demos: [
      {
        project: "Agape",
        description: `
        Point of sale for stationery in which a SPA with reactjs was implemented,
        consumes a rest API on the backend that allows CRUD on the database.`,
        skills: skill.agape,
        url: link.agape,
        label: label.en,
      },
      {
        project: "Grants",
        description: `
        The backend redirects "grants / search" and the frontend with reactjs exposes the opportunities.`,
        skills: skill.grants,
        url: link.grants,
        label: label.en,
      },
      {
        project: "Sigma",
        description: `
        The backend also exposes a restful api that allows the CRUD of the person class
        in the database and the frontend developed in reactjs that consumes the api
        previously mentioned. `,
        skills: skill.sigma,
        url: link.sigma.landing,
        label: label.en,
      },
      {
        project: "Valiu",
        description: `
        Create a tag with a name and assign a random color,
        the tag is inserted at the beginning of the list, edit the tag name,
        remove the tag, sync the list in real time on all clients.
        If customer A adds a "Foo" tag,
        then client B must update its list in real time to
        add the new tag "Foo" to the top of the list,
        also all changes such as edits and deletions of items.`,
        skills: skill.valiu,
        url: link.valiu,
        label: label.en,
      },
    ],
  },
  footer: {
    source: "The source code is licensed",
    web: "website content is licensed",
  },
};

export default model;
