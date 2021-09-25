import { skill, link, Language } from "./common";
import { href } from "./href";

export const es: Language = {
  title: "Bienvenido - Miguel Angel Pineda Vega",
  nav: {
    home: "Inicio",
    skill: "Habilidades",
    demo: "Demos",
    lang: {
      current: "es",
      title: "Cambiar Idioma",
      href: href.en,
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
    demo: {
      label: { help: "Acerca De", back: "Volver", go: "Ir" },
      projects: [
        {
          title: "Agape",
          description: `
          Punto de venta para papeleria en el cual se puso en práctica una SPA con reactjs, 
          consume una API rest en el backend que permite CRUD en la base de datos.`,
          skills: skill.agape,
          url: link.agape,
        },
        {
          title: "Grants",
          description: `
          El backend redirecciona "grants/search" y el frontend con reactjs expone las oportunidades.`,
          skills: skill.grants,
          url: link.grants,
        },
        {
          title: "Sigma",
          description: `
          El backend ademas expone una api restful que permite el CRUD de la clase persona 
          en la base de datos y el frontend desarrollado en reactjs que consume las api 
          previamente mensionadas.`,
          skills: skill.sigma,
          url: link.sigma.landing,
        },
        {
          title: "Valiu",
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
        },
      ],
    },
  },
  footer: {
    source: "El código fuente tiene licencia",
    web: "contenido del sitio web tiene licencia",
  },
};

export default es;
