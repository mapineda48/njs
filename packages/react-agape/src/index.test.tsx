import React from "react";
import { render } from "@testing-library/react";

function App() {
  return <div>Foo</div>;
}

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Foo/i);
  expect(linkElement).toBeInTheDocument();
});
