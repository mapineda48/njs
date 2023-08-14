import { useRelative } from "Router";

export default function DetailShop(props: any) {
  const {changeTo} = useRelative();

  const next = parseInt(props.param.id) + 1;

  return (
    <div>
      Welcome to the detail with id {props.param.id} !!!
      <button
        onClick={() => {
          changeTo(`/detail/${next}`);
        }}
      >
        detail {next}
      </button>
    </div>
  );
}
