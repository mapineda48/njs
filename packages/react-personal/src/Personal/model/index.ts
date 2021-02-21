import * as _skill from "../skill";
import type { Props as Skill, Label as ILabel } from "../Card";

export const label: Label = {
  es: { help: "Acerca De", back: "Volver", go: "Ir" },
  en: { help: "About it", back: "Back", go: "Go" },
};

export const link = {
  agape: "/demos/react/agape/",
  grants: "/demos/react/grants/",
  sigma: {
    landing: "/demos/react/sigma/",
    admin: "/demos/react/sigma/admin/",
  },
  valiu: "/demos/vue/valiu/",
};

export const skill = {
  agape: [
    _skill.typescript,
    _skill.scss,
    _skill.react,
    _skill.redux,
    _skill.node,
    _skill.postgres,
  ],
  grants: [_skill.typescript, _skill.scss, _skill.react, _skill.node],
  sigma: [
    _skill.typescript,
    _skill.scss,
    _skill.react,
    _skill.node,
    _skill.postgres,
  ],
  valiu: [_skill.typescript, _skill.scss, _skill.vue, _skill.node, _skill.postgres],
};

/**
 * Types
 */
export interface Label {
  es: ILabel;
  en: ILabel;
}

export interface Model {
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
    demos: Skill[];
  };
  footer: {
    source: string;
    web: string;
  };
}
