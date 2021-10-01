const id = "chat-social-guest";

export const route = "/social/guest";

export function mountChat(src = route) {
  if (process.env.NODE_ENV === "development") {
    console.log("mount chat");
    return () => {
      console.log("unmount chat");
    };
  }

  if (document.getElementById(id)) {
    return;
  }

  const iframe = document.createElement("iframe");

  iframe.id = id;
  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.src = src;

  document.body.appendChild(iframe);

  return () => {
    document.body.removeChild(iframe);
  };
}
