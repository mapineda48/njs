import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import sigma from "@mapineda48/demos-sigma/esm/route";
import grants from "@mapineda48/demos-grants/esm/baseUrl";
import Card, { Label as CardLabel } from "./Card";
import { ReactComponent as Brand } from "./brand.svg";
import skill from "./skill";
import "./index.scss";

function scrollIt(target: HTMLElement | null) {
  if (!target) return;
  scrollIntoView(target, {
    scrollMode: "if-needed",
    block: "nearest",
    inline: "nearest",
  });
}

export default function PersonalPage({ model, changeTo }: Props) {
  const home = React.useRef<HTMLElement>(null);

  const skills = React.useRef<HTMLElement>(null);

  const demos = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    document.documentElement.lang = model.lang.current;

    document.title = model.title;
  }, [model.title, model.lang]);

  const imgs = React.useMemo(() => Object.values(skill), [skill]);

  return (
    <>
      <Helmet>
        <meta name="robots" content="index,nofollow" />
        <meta name="googlebot" content="index,nofollow" />
        <meta name="description" content={model.description} />
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
      <main className="main">
        <section ref={home} id="home" className="section home">
          <div>
            <img
              title="Miguel Angel Pineda Vega"
              src="/images/photo.png"
              alt="Miguel Pineda"
              className="shadow-one"
            />
          </div>
          <p>{model.description}</p>
        </section>
        <section ref={skills} id="skill" className="section">
          <div className="skills">
            {Object.values(skill).map((img, index) => (
              <div key={index} className="skill" title={img.title}>
                <a href={img.url} target="_blank" rel="noreferrer">
                  <img src={img.image} alt={img.title} />
                </a>
              </div>
            ))}
          </div>
        </section>
        <section ref={demos} id="demo" className="section demos">
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
                skill.postgres
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
      </main>
      <footer className="footer">
        <p>
          <strong>apinedavegamiguel</strong> por{" "}
          <a href="https://jgthms.com">Miguel Pineda</a>. {model.source + " "}
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          {model.license + " "}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY NC SA 4.0
          </a>
          .
        </p>
      </footer>
    </>
  );
}

/**
 * Typings
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
  description: string;
  demos: {
    sigma: string;
    grants: string;
  };
  card: CardLabel;
  source: string;
  license: string;
}
