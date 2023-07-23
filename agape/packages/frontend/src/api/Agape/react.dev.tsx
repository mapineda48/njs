import { useCallback, useEffect, useState } from "react";
import AgapeApi, { useApi, useApis } from "Agape/Session";
import { IAgapeApi } from ".";

async function uploadTest(api: IAgapeApi, file: File, filename: string) {
  const newRole = await api.model.role.create({ fullName: "Conserje" });

  console.log(newRole);

  const [record] = await api.model.role.update(
    { fullName: "Miguel Pineda" },
    {
      where: {
        id: newRole.id,
      },
    }
  );

  console.log(record);

  console.log(
    await api.model.role.destroy({
      where: {
        id: record.id,
      },
    })
  );

  console.log(await api.helloWorld());

  console.log(await api.greet("Miguel Pineda"));

  return await api.uploadPublic(file, filename);
}

export function App() {
  const [filename, setFileName] = useState("");
  const [file, setFile] = useState<null | File>(null);
  const [task, uploadFile] = useApis(uploadTest);

  const { loading, error, result } = task;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error!!!</div>;
  }

  if (result) {
    return <a href={result}>{result}</a>;
  }

  const submitFile = () => {
    if (!file || !filename) {
      return;
    }

    uploadFile(file, filename);
  };

  return (
    <form>
      <input
        type="text"
        value={filename}
        onChange={({ target }) => {
          setFileName(target.value);
        }}
      />
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
    </form>
  );
}

export default function UnMountTest() {
  const [state, setState] = useState(true);

  return (
    <AgapeApi>
      <div>
        <button onClick={() => setState((state) => !state)}>toggle</button>
        {state && <App />}
      </div>
    </AgapeApi>
  );
}

const initState = {
  args: null,
  error: undefined,
  result: undefined,
};

export function usePromiseFoo<T>(
  cb: T
): T extends (...args: infer A) => Promise<infer R>
  ? { (...args: A): void; loading: boolean; result?: R; error?: Error }
  : unknown;
export function usePromiseFoo(cb: any) {
  const [state, setState] = useState<any>({ ...initState });

  const setArgs: any = useCallback(
    (...args: any[]) => setState({ ...initState, args }),
    []
  );

  const setResult: any = useCallback(
    (result: any) => setState({ ...initState, result }),
    []
  );

  const setError: any = useCallback(
    (error: any) => setState({ ...initState, error }),
    []
  );

  const { args, error, result } = state;

  useEffect(() => {
    if (!args) {
      return;
    }

    let onSuccess: any = setResult;
    let onError: any = setError;

    cb(...args)
      .then((res: any) => onSuccess && onSuccess(res))
      .catch((err: any) => onError && onError(err));

    return () => {
      onSuccess = null;
      onError = null;
    };
  }, [args, cb, setError, setResult]);

  setArgs.loading = Boolean(args);
  setArgs.result = result;
  setArgs.error = error;

  return setArgs;
}

export function wait(timeout = 1000) {
  return new Promise((res) => {
    setTimeout(res, timeout);
  });
}
