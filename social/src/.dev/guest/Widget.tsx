import React from "react";
import { render } from "../../common";
import { inIframe } from "../../guest/Widget/Iframe";
import Widget from "../../guest/Widget";
import Socket from "../../guest/Socket";
import Miguel from "./Miguel";
import { mockMiguel } from "./io";
import "../../guest/styles.scss";

/**
 * This entry exists for development purposes only, within
 * production build is not included.
 */

if (!inIframe) {
  const iframe = document.createElement("iframe");

  iframe.src = "/";

  document.body.appendChild(iframe);

  const iWindow = iframe.contentWindow;

  if (!iWindow) {
    throw new Error("missing window's iframe");
  }

  document.body.style.backgroundColor = "yellow";

  //wait to ready ref to mock
  setTimeout(() => {
    const mockMiguel = (iWindow as any)._mockMiguel_;

    if (mockMiguel) {
      render(<Miguel mock={mockMiguel} />);
    } else {
      console.error("missing ref to mock in iframe");
    }
  }, 500);
} else {
  /**
   * This happen inside iframe
   */

  (window as any)._mockMiguel_ = mockMiguel;

  render(
    <Socket>
      <Widget />
    </Socket>
  );
}
