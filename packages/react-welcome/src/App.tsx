import React from "react";

export default function App() {
  const [state, setState] = React.useState(false);

  return (
    <div>
      {state ? <div>Welome to minimalist</div> : <div>Hello World!!!</div>}
      <button onClick={() => setState((state) => !state)}>
        {state ? "back" : "Greetings!!!"}
      </button>
    </div>
  );
}
