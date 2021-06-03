export function grettings(name = "") {
  const ext = name ? " " + name : "";

  return `SELECT 'Nodejs, PostgreSQL, Reactjs greets you${ext}' as "message";`;
}
