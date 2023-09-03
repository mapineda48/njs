import { initClient } from "backend/api";
import { AgapeHeader, ShopHeader } from "backend/api/client";

const api = initClient();

api.onSigIn((app, token) => {
  localStorage.setItem(app, token);
});

api.onExit((app) => {
  localStorage.removeItem(app);
});

const agape = localStorage.getItem(AgapeHeader);
const shop = localStorage.getItem(ShopHeader);

if (agape) {
  api.authenticate({ agape });
}

if (shop) {
  api.authenticate({ shop });
}

export default api;
