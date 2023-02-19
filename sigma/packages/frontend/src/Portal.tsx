import PortalProvider, {
  Props as PortalProps,
  usePortalToBody,
} from "Component/Portal";

export default function PortalTest() {
  return (
    <PortalProvider>
      <Foo />
    </PortalProvider>
  );
}

function Foo() {
  const showAlert = usePortalToBody(Bar);

  return (
    <button
      onClick={() => {
        showAlert({
          title: "test",
          message: "foo",
        });
      }}
    >
      click to append to body
    </button>
  );
}

function Bar(props: Props) {
  return (
    <div style={props.style}>
      <h1>{props.title}</h1>
      <p>{props.message}</p>
      <button onClick={props.remove}>remove it</button>
    </div>
  );
}

/**
 * Types
 */
interface Props extends PortalProps {
  message: string;
  title: string;
}
