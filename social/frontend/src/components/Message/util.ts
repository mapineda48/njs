const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
/**
 * Regex if you want to ensure URL starts with HTTP/HTTPS
 * https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
 */
export function isURL(val: string) {
  return Boolean(val.match(expression));
}
