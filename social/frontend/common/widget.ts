import * as action from "../src/guest/iframe/action";
import * as type from "../src/guest/iframe/type";

import type { Action } from "../src/guest/iframe/action";

const ID = "social-chat-guest";

const ROUTE = "/social/guest/";

const TIME = 100;

const script = document.currentScript as HTMLScriptElement;

const url = new URL(script.src);

const guest = url.origin + ROUTE;

const app = script.getAttribute("app") ?? "Desconocido";

let isConnect = false;

let attempts = 0;

const maxAttempts = 20;

//console.log({ url, guest, app });
let iframe = document.getElementById(ID) as HTMLIFrameElement;

if (!iframe) {
  iframe = document.createElement("iframe");
  iframe.id = ID;

  /**
   * https://stackoverflow.com/questions/2007357/how-to-set-dom-element-as-the-first-child
   */
  document.body.insertBefore(iframe, document.body.firstChild);
}

iframe.id = ID;
iframe.style.display = "none";
iframe.style.width = "0px";
iframe.style.height = "0px";
iframe.src = guest;

/**
 * Connect with social app
 */
iframe.onload = function connectWithApp() {
  attempts += 1;

  if (attempts > maxAttempts) {
    //console.log("max attempts...");
    return;
  }

  const window = iframe.contentWindow;

  if (!window) {
    //console.log("fail connnect with app");
    setTimeout(connectWithApp, TIME);
    return;
  }

  //console.log("try connect with app");
  window.postMessage(action.connect(app), url.origin);

  setTimeout(() => {
    if (isConnect) {
      //console.log("sucess connection");
      return;
    }

    //console.log("timeout connection");
    connectWithApp.call(this);
  }, TIME);
};

//console.log("ready to messages");
window.addEventListener("message", (event) => {
  //console.log(event.origin);
  //console.log(event.data);

  if (event.origin !== url.origin) {
    return;
  }

  const action: Action = event.data;

  switch (action.type) {
    case type.CONNECT: {
      isConnect = true;
      return;
    }
    case type.SET_STYLE: {
      Object.entries(action.style).forEach(([key, val]: any) => {
        iframe.style[key] = val;
      });
      return;
    }

    default:
      //console.error("invalid action");
      //console.log(action);
      return;
  }
});
