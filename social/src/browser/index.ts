export function mountChat(src = "/social/guest") {
  if (process.env.NODE_ENV === "development") {
    console.log("mount chat");
    return () => {
      console.log("unmount chat");
    };
  }

  const iframe = document.createElement("iframe");

  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.src = src;

  document.body.appendChild(iframe);

  return () => {
    document.body.removeChild(iframe);
  };
}
