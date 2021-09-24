/**
 * Set in cache
 * https://nodejs.org/api/modules.html#modules_require_cache
 * @param key
 * @param cb
 */
export function setInCache<T = any>(key: string, cb: (val: T) => T) {
  const _export: any = require(key);

  const nodeModule = require.cache[key];

  delete require.cache[key];

  (require as any).cache[key] = {
    ...nodeModule,
    exports: cb(_export),
  };
}
