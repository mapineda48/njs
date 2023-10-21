const root = document.getElementById("root") as HTMLDivElement;

const resize = () => {
  root.style.height = `${window.innerHeight}px`;
  root.style.width = `${window.innerWidth}px`;
};

resize();

window.addEventListener("resize", resize);

export default root;
