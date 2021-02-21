import { skill, label, link, Model } from ".";

export const model: Model = {
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
