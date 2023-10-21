export default function storage(namespace: string) {
  const keyItem = (key = "") => (!key ? namespace : namespace + "." + key);

  return {
    set(value: string, key?: string) {
      localStorage.setItem(keyItem(key), value);
    },
    get(key?: string) {
      return localStorage.getItem(keyItem(key));
    },
    remove(key?: string) {
      localStorage.removeItem(keyItem(key));
    },
  };
}
