import axios from "axios";
import { createApi } from ".";
import { useState } from "react";

const baseURL = "http://localhost:5000";

const instance = axios.create({
  baseURL,
});

const api = createApi(instance);

export default function App() {
  const [file, setFile] = useState<null | File>(null);

  const submitFile = async () => {
    if (!file) {
      return;
    }

    api
      .uploadPublic(file, "demo/miguel/pineda pineda")
      .http.then(console.log)
      .catch(console.error);
  };

  return (
    <div>
      <input
        type="file"
        onChange={({ target }) => {
          const { files } = target;

          if (!files || !files.length) {
            return;
          }

          const file = files.item(0);

          setFile(file);
        }}
      />
      <button onClick={submitFile}>Submit</button>
    </div>
  );
}
