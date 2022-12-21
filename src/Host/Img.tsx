import puppeteer from "../puppeteer";

export function Img(props: Props) {
  let src = props.src;

  if (src) {
    src = puppeteer.currentHost + props.src;
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} src={src} />;
}

/**
 * Types
 */
type Props = JSX.IntrinsicElements["img"];
