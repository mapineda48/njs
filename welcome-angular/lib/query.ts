export function grettings(name = "") {
  const ext = name ? " " + name : "";

  return `SELECT 'nodejs, postgresql, angular greets you${ext}' as "message";`;
}
