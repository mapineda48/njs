import { useRelative } from "Router";

export default function HomeShop() {
  const changeTo = useRelative();

  return (
    <div>
      Welcome to the shop !!!
      <button
        onClick={() => {
          changeTo("/detail/1");
        }}
      >
        detail 1
      </button>
      <button
        onClick={() => {
          changeTo("/products");
        }}
      >
        products
      </button>
    </div>
  );
}
