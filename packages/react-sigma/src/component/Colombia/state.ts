import React from "react";
import http from "../../http";
import type { Colombia } from "shared";

const value: any = null;

export default function ColombiaF () {
  const [colombia, setColombia] = React.useState<Colombia>(value);
  const [message, setMessage] = React.useState("");

  const state = {
    current: colombia,
    message,
  };

  const fetch = React.useCallback(async () => {
    try {
      const colombia = await http.fetchColombia();
      setColombia(colombia);
    } catch (error) {
      console.log(error);
      setMessage("Error al obtener colombia");
    }
  }, [setColombia, setMessage]);

  const reducer = {
    colombia: setColombia,
    message: setMessage,
    fetch,
  };

  return [state, reducer] as const;
}
