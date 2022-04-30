import * as action from "./action";
import * as type from "./type";

import type { Action } from "./action";

//console.log("prepare iframe");

let origin = "";

let app = "";

let postMessage: ((data: any) => void) | null = null;

const cbsConnect: OnConnect[] = [];

export function onConnect(cb: OnConnect) {
  if (origin && app) {
    cb(origin, app);
    return;
  }

  cbsConnect.push(cb);
}

export function open() {
  if (!postMessage) {
    return;
  }

  postMessage(
    action.setStyle({
      height: "99vh",
      width: "99vw",
    })
  );
}

export function close() {
  if (!postMessage) {
    return;
  }

  postMessage(
    action.setStyle({
      height: "185px",
      width: "40px",
    })
  );
}

window.addEventListener("message", (event) => {
  //console.log(`recevied message: ${event.data} from origin ${event.origin}`);

  const proxy: any = event.source;

  if (!proxy) {
    //console.log("missing src");
    return;
  }

  const payload: Action = event.data;

  switch (payload.type) {
    case type.CONNECT: {
      if (origin) {
        return;
      }

      origin = event.origin;
      app = payload.app;

      postMessage = (data) => {
        proxy.postMessage(data, origin);
      };

      postMessage(action.connect(payload.app));

      postMessage(
        action.setStyle({
          display: "initial",
          position: "fixed",
          right: "0px",
          top: "50%",
          transform: "translate(0px, -50%)",
          zIndex: "1000",
          width: "0px",
          height: "0px",
          borderRadius: "4px",
          border: "none",
          maxHeight: "410px",
          maxWidth: "340px",
        })
      );

      if (cbsConnect.length) {
        cbsConnect.forEach((cb) => cb(origin, app));
        cbsConnect.length = 0;
      }

      return;
    }

    default:
      return;
  }
});

/**
 * Types
 */

type OnConnect = (origin: string, app: string) => void;
