import React from "react";
import axios from "axios";

import type { Data } from "./shared";

export default function App() {
  const [data, setData] = React.useState<Data | null>(null);
  const [isLoading, setLoading] = React.useState(false);

  if (!data && !isLoading) {
    setLoading(true);
    setData({ message: "loading..." });

    axios
      .get<Data>("api")
      .then((res) => setData(res.data))
      .catch((err) => setData({ message: err.message }))
      .finally(() => setLoading(false));
  }

  return <h1>{data?.message}</h1>;
}
