import puppeteer from "../puppeteer";

export function Img(props: Props) {
  if (props.src) {
    props.src = puppeteer.currentHost + props.src;
  }
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
}

/**
 * Types
 */
type Props = JSX.IntrinsicElements["img"];
