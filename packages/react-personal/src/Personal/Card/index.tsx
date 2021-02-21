import React from "react";
import { FiHelpCircle } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Skill as ISkill } from "../skill";
import clsx from "clsx";
import style from "./index.module.scss";

function Action(props: AProps) {
  return <div {...props} role="button" className={style.help}></div>;
}

export default function Card(props: Props) {
  const [state, setState] = React.useState(false);

  const flip = React.useCallback(() => setState((state) => !state), [setState]);

  const reset = React.useCallback(() => setState(false), [setState]);

  return (
    <div className={style.flipCard} onMouseLeave={state ? reset : undefined}>
      <div className={clsx([style.inner, state && style.flip])}>
        <div className={style.front}>
          <Action title={props.label.help} onClick={flip}>
            <FiHelpCircle />
          </Action>
          <h1>{props.project}</h1>
          <div>
            {props.skills.map(({ Icon, title, url }, index) => (
              <a key={index} href={url} target="_blank" rel="noreferrer">
                <Icon title={title} />
              </a>
            ))}
          </div>
          <a href={props.url}>{props.label.go}</a>
        </div>
        <div className={style.back}>
          <Action title={props.label.back} onClick={flip}>
            <IoMdArrowRoundBack />
          </Action>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Types
 */

type AProps = Omit<JSX.IntrinsicElements["div"], "className">;

export interface Label {
  help: string;
  back: string;
  go: string;
}

export interface Skill {
  project: string;
  skills: ISkill[];
  description: string;
  url: string;
}

export interface Props extends Skill {
  label: Label;
}
