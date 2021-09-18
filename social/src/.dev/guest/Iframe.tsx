import Iframe, { inIframe } from "../../guest/Widget/Iframe";
import { render } from "../../common";
import "../../guest/styles.scss";

/**
 * This entry exists for development purposes only, within
 * production build is not included.
 */

if (!inIframe) {
  const iframe = document.createElement("iframe");

  iframe.src = "/";

  document.body.appendChild(iframe);

  document.body.style.backgroundColor = "yellow";
} else {
  /**
   * This happen inside iframe
   */
  render(
    <Iframe open={false}>
      <div>hello world!!!</div>
    </Iframe>
  );
}
