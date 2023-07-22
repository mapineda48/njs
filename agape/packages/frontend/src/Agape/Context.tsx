import useSize from "hook/useSize";

export default function ContentPage() {
  const ref = useSize((el) => {
    const { left } = el.getBoundingClientRect();

    el.style.width = window.innerWidth - left + "px";
  });
  return (
    <div
      ref={ref}
      style={{ width: 300, height: 3000, backgroundColor: "blueviolet" }}
    >
      foo
    </div>
  );
}
