import React from "react";
import { Helmet } from "react-helmet";
import { FaTwitter, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import Card from "./Card";
import { ReactComponent as Brand } from "./brand.svg";
import { icon } from "./skill";
import "./index.scss";

import type { Language } from "./model";
import type { Skill } from "./skill";

function scrollIt(target: HTMLElement | null) {
  if (!target) return;
  scrollIntoView(target, {
    scrollMode: "if-needed",
    block: "nearest",
    inline: "nearest",
  });
}

export default function PersonalPage({ lang, skill }: Props) {
  const home = React.useRef<HTMLElement>(null);

  const skills = React.useRef<HTMLElement>(null);

  const demos = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    document.documentElement.lang = lang.nav.lang.current;

    document.title = lang.title;
  }, [lang.nav.lang, lang.title]);

  const { nav, main, footer } = lang;

  const imgs = React.useMemo(() => Object.values(skill), [skill]);

  return (
    <>
      <Helmet>
        <meta name="robots" content="index,nofollow" />
        <meta name="googlebot" content="index,nofollow" />
        <meta name="description" content={main.home.description} />
        <meta name="google" content="notranslate" />
      </Helmet>
      <nav className="header shadow-one">
        <div className="brand" title="Miguel Angel Pineda Vega">
          <Brand width="40px" height="40px" />
          <h1>iguel Pineda</h1>
        </div>
        <ul className="sections">
          <li>
            <Link to={nav.lang.href} title={nav.lang.title}>
              {nav.lang.next}
            </Link>
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
              src="/images/photo.png"
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
            {main.demo.projects.map((demo, index) => {
              const { title, description, skills, url } = demo;
              return (
                <Card
                  key={index}
                  title={title}
                  description={description}
                  url={url}
                  label={main.demo.label}
                  skills={skills.map((key) => {
                    return { ...skill[key], Icon: icon[key] };
                  })}
                />
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
    </>
  );
}

/**
 * Typings
 */

interface Props {
  lang: Language;
  skill: Skill;
}
