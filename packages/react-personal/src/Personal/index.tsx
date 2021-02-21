import React from "react";
import { Helmet } from "react-helmet";
import { FaTwitter, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import Root from "../components/Root";
import Card from "./Card";
import { ReactComponent as Brand } from "./brand.svg";
import miguel from "./miguel.png";
import * as skill from "./skill";
import "./index.scss";

import type { Model } from "./model";

function scrollIt(target: HTMLElement | null) {
  if (!target) return;
  scrollIntoView(target, {
    scrollMode: "if-needed",
    block: "nearest",
    inline: "nearest",
  });
}

const imgs = Object.values(skill);

export default function PersonalPage({ model }: Props) {
  const home = React.useRef<HTMLElement>(null);

  const skills = React.useRef<HTMLElement>(null);

  const demos = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    document.documentElement.lang = model.nav.lang.current;

    document.title = model.title;
  }, [model.nav.lang, model.title]);

  const { nav, main, footer } = model;

  return (
    <Root>
      <Helmet>
        <meta name="robots" content="index,nofollow" />
        <meta name="googlebot" content="index,nofollow" />
        <meta name="description" content={main.home.description} />
        <meta name="google" content="translate" />
      </Helmet>
      <nav className="header shadow-one">
        <div className="brand" title="Miguel Angel Pineda Vega">
          <Brand width="40px" height="40px" />
          <h1>iguel Pineda</h1>
        </div>
        <ul className="sections">
          <li>
            <a href={nav.lang.href} title={nav.lang.title}>
              {nav.lang.next}
            </a>
          </li>
          <li title={nav.home}>
            <a onClick={() => scrollIt(home.current)} href="#home">
              {nav.home}
            </a>
          </li>
          <li title={nav.skill}>
            <a onClick={() => scrollIt(skills.current)} href="#skill">
              {nav.skill}
            </a>
          </li>
          <li title={nav.demo}>
            <a onClick={() => scrollIt(demos.current)} href="#demo">
              {nav.demo}
            </a>
          </li>
        </ul>
      </nav>
      <ul className="social">
        <li className="twitter shadow-one">
          <a
            href="https://twitter.com/MiguelPinedaTec"
            title="Twitter"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
        </li>
        <li className="facebook shadow-one">
          <a
            href="https://www.facebook.com/a.pinedavegamiguel"
            title="Facebook"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </a>
        </li>{" "}
        <li className="github shadow-one">
          <a
            href="https://github.com/mapineda48"
            title="Github"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </li>
        <li className="linkedin shadow-one">
          <a
            href="https://co.linkedin.com/in/apinedavegamiguel"
            title="Github"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </li>
      </ul>
      <main className="main">
        <section ref={home} id="home" className="section home">
          <div>
            <img
              title="Miguel Angel Pineda Vega"
              src={miguel}
              alt="Miguel Pineda"
              className="shadow-one"
            />
          </div>
          <p>{main.home.description}</p>
        </section>
        <section ref={skills} id="skill" className="section">
          <div className="skills">
            {imgs.map((img, index) => {
              return (
                <div key={index} className="skill" title={img.title}>
                  <a href={img.url} target="_blank" rel="noreferrer">
                    <img src={img.image} alt={img.title} />
                  </a>
                </div>
              );
            })}
          </div>
        </section>
        <section ref={demos} id="demo" className="section demos">
          <div className="projects">
            {main.demos.map((demo, index) => {
              const { project, description, skills, url, label } = demo;
              return (
                <Card
                  key={index}
                  project={project}
                  description={description}
                  skills={skills}
                  url={url}
                  label={label}
                />

                // <div key={index} className="project shadow-one">
                //   <h2>{title}</h2>
                //   <p>{description}</p>
                //   <a href={link.href}>{link.content}</a>
                // </div>
              );
            })}
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>
          <strong>apinedavegamiguel</strong> por{" "}
          <a href="https://jgthms.com">Miguel Pineda</a>. {footer.source + " "}
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          {footer.web + " "}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY NC SA 4.0
          </a>
          .
        </p>
      </footer>
    </Root>
  );
}

/**
 * Typings
 */

interface Props {
  model: Model;
}
