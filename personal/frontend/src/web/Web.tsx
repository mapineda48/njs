import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import sigma from "@mapineda48/demos-sigma/frontend/lib/baseUrl";
import grants from "@mapineda48/demos-grants/esm/baseUrl";
import Card, { Label as CardLabel } from "./Card";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import AOS from "aos";
import { ReactComponent as Brand } from "./brand.svg";
import image from "./img";
import skill from "./skill";

export default function Web(props: Props) {
  const { model, changeTo } = props;

  const home = React.useRef<HTMLElement>(null);

  const skills = React.useRef<HTMLElement>(null);

  const demos = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    document.title = model.title;
  }, [model.title]);

  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <meta name="robots" content="index,nofollow" />
        <meta name="googlebot" content="index,nofollow" />
        <meta name="description" content={model.home} />
        <meta name="google" content="notranslate" />
      </Helmet>
      <nav className="header shadow-one">
        <div className="brand" title="Miguel Angel Pineda Vega">
          <Brand width="40px" height="40px" />
          <h1>iguel Pineda</h1>
        </div>
        <ul className="sections">
          <li>
            <Link to={changeTo} title={model.lang.title}>
              {model.lang.next.toUpperCase()}
            </Link>
          </li>
          <li title={model.nav.home}>
            <a onClick={() => scrollIt(home.current)} href="#home">
              {model.nav.home}
            </a>
          </li>
          <li title={model.nav.skill}>
            <a onClick={() => scrollIt(skills.current)} href="#skill">
              {model.nav.skill}
            </a>
          </li>
          <li title={model.nav.demos}>
            <a onClick={() => scrollIt(demos.current)} href="#demo">
              {model.nav.demos}
            </a>
          </li>
        </ul>
      </nav>
      <section ref={home} id="home" className="home">
        <img
          title="Miguel Angel Pineda Vega"
          className="shadow-one"
          src={image.personal}
          alt="Miguel Angel Pineda Vega"
        />
        <p data-aos="fade-down">{model.home}</p>
      </section>
      <section ref={skills} id="skill" className="skills">
        <div data-aos="fade-right" className="imgs">
          {Object.values(skill).map(({ image, title, url }, index) => (
            <a href={url} target="_blank" rel="noreferrer" key={index}>
              <img src={image} alt={title} title={title}></img>
            </a>
          ))}
        </div>
      </section>
      <section ref={demos} id="demo" className="demos">
        <div className="projects">
          <Card
            title="Sigma"
            description={model.demos.sigma}
            url={sigma}
            label={model.card}
            skills={[
              skill.html,
              skill.css,
              skill.js,
              skill.ts,
              skill.react,
              skill.node,
              skill.express,
              skill.postgres,
            ]}
          />
          <Card
            title="Grants"
            description={model.demos.grants}
            url={grants}
            label={model.card}
            skills={[
              skill.html,
              skill.css,
              skill.js,
              skill.ts,
              skill.react,
              skill.node,
              skill.express,
            ]}
          />
        </div>
      </section>
    </React.Fragment>
  );
}

function scrollIt(target: HTMLElement | null) {
  if (!target) return;
  scrollIntoView(target, {
    scrollMode: "if-needed",
    block: "nearest",
    inline: "nearest",
  });
}

/**
 * Types
 */
interface Props {
  changeTo: string;
  model: Model;
}

export interface Model {
  lang: {
    current: string;
    next: string;
    title: string;
  };
  title: string;
  nav: {
    home: string;
    skill: string;
    demos: string;
  };
  home: string;
  demos: {
    sigma: string;
    grants: string;
  };
  card: CardLabel;
  source: string;
  license: string;
}
