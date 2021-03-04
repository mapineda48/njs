import { Key as KSkill } from "../skill";
import type { Props as Skill, Label } from "../Card";

export const link = {
  agape: "/demos/agape",
  grants: "/demos/grants",
  sigma: {
    landing: "/demos/sigma",
    admin: "/demos/sigma/admin",
  },
  valiu: "/demos/valiu",
};

const agape: Skills = ["ts", "scss", "react", "redux", "node", "postgres"];

const grants: Skills = ["ts", "css", "react", "node"];

const sigma: Skills = ["ts", "scss", "react", "node", "postgres"];

const valiu: Skills = ["ts", "scss", "vue", "node", "postgres"];

export const skill = {
  agape,
  grants,
  sigma,
  valiu,
};

/**
 * Types
 */
export type Skills = KSkill[];

type Project = { skills: Skills } & Omit<Skill, "icon" | "skills" | "label">;

export interface Language {
  title: string;
  nav: {
    home: string;
    skill: string;
    demo: string;
    lang: {
      current: string;
      next: string;
      title: string;
      href: string;
    };
  };
  main: {
    home: {
      description: string;
    };
    demo: {
      label: Label;
      projects: Project[];
    };
  };
  footer: {
    source: string;
    web: string;
  };
}
