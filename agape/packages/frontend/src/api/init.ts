export default function initApi(current?: Current) {
  const { agape, shop } = current || {};

  const apiAgape = null;
  const apiShop = null;

  const isClient = false;
  const isAuthenticated = false;

  if (agape) {
    // validar con el api el token
  }

  if (shop) {
    // validar con el api el token
  }

  const res = {};

  Object.defineProperty(res, "isClient", {
    configurable: false,
    get() {
      return isClient;
    },
  });

  Object.defineProperty(res, "isAuthenticated", {
    configurable: false,
    get() {
      return isAuthenticated;
    },
  });

  Object.defineProperty(res, "agape", {
    configurable: false,
    get() {
      return apiAgape;
    },
  });

  Object.defineProperty(res, "shop", {
    configurable: false,
    get() {
      return apiShop;
    },
  });

  return res;
}

/**
 * Types
 */

interface Current {
  agape?: string | null;
  shop?: string | null;
}
