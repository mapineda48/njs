import React from "react";
import http from "service/http";

export default function App() {
  const [message, setMessage] = React.useState("");

  if (message) {
    return <div>{message}</div>;
  }

  http
    .greet()
    .then(({ message }) => setMessage(message))
    .catch(({ message }) => setMessage(message || "Unknown Error"));

  return <div>Loading...</div>;
}
