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
  const styles = chat.header.map((style) => {
    const pipe = document.createElement("div");

    pipe.innerHTML = style;

    return pipe.children[0] as HTMLLinkElement;
  });

  const scripts = chat.body.map((script) => {
    const pipe = document.createElement("div");

    pipe.innerHTML = script;

    return pipe.children[0] as HTMLScriptElement;
  });

  styles.forEach((style) => document.head.appendChild(style));
  scripts.forEach((script) => document.body.appendChild(script));
}


/**
 * Types
 */
interface Chat {
  header: string[];
  body: string[];
}
