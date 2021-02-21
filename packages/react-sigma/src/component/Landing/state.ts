import React from "react";
import http from "../../http";
import type { Person } from "shared";

export default function Landing () {
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const state = {
    message,
    loading,
  };

  const insert = React.useCallback(
    async (person: Person) => {
      setLoading(true);

      try {
        await http.insertPerson(person);
        setMessage("Registrado correctmente");
      } catch (err) {
        console.log(err);
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setMessage]
  );

  const reducer = {
    message: setMessage,
    loading: setLoading,
    insert,
  };

  return [state, reducer] as const;
}
