import * as axios from "axios";

export = function fetch() {
  if (process.env.NODE_ENV === "development") return;

  axios.default
    .get<Chat>("/chat.json")
    .then(({ data }) => appendInDocument(data))
    .catch((err) => console.log(err));
};

/**
 * https://stackoverflow.com/questions/10309650/add-elements-to-the-dom-given-plain-text-html-using-only-pure-javascript-no-jqu
 * @param chat Chat
 */
function appendInDocument(chat: Chat) {
  const styles = chat.header.map((style) =>
    createElmentFromRaw<HTMLStyleElement>(style)
  );

  const scripts = chat.body.map((script) =>
    createElmentFromRaw<HTMLScriptElement>(script)
  );

  styles.forEach((style) => document.head.appendChild(style));
  scripts.forEach((script) => document.body.appendChild(script));
}

/**
 * https://stackoverflow.com/questions/10309650/add-elements-to-the-dom-given-plain-text-html-using-only-pure-javascript-no-jqu
 */
function createElmentFromRaw<T extends HTMLElement>(element: string): T {
  const pipeElement = document.createElement("div");

  pipeElement.innerHTML = element;

  return pipeElement.children[0] as any;
}

/**
 * Types
 */
interface Chat {
  header: string[];
  body: string[];
}
