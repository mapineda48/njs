/**
 * Get value from enviroment process
 */
export function env(key: keyof NodeJS.ProcessEnv, defaultValue?: string) {
  const value = process.env[key] ?? defaultValue;

  if (value) {
    return value;
  }

  throw new Error(`missing enviroment variable ${key}`);
}
