export function grettings(name = "") {
  const ext = name ? ` "${name}"` : "";

  return `SELECT 'nodejs, postgresql, reactjs with router greets you${ext}' as "message";`;
}
