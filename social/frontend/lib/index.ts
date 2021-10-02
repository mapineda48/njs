const id = "chat-social-guest";

export const route = "/social/guest";

let cache: (() => void) | null = null;

export function mountChat(src = route) {
  if (process.env.NODE_ENV === "development") {
    console.log("mount chat");
    return () => {
      console.log("unmount chat");
    };
  }

  const current = document.getElementById(id);

  if (current) {
    if (!cache) {
      cache = () => {
        document.body.removeChild(current);
      };
    }

    return cache;
  }

  const iframe = document.createElement("iframe");

  iframe.id = id;
  iframe.style.display = "none";
  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.src = src;

  /**
   * https://stackoverflow.com/questions/2007357/how-to-set-dom-element-as-the-first-child
   */
  document.body.insertBefore(iframe, document.body.firstChild);

  cache = () => {
    document.body.removeChild(iframe);
  };

  return cache;
}
