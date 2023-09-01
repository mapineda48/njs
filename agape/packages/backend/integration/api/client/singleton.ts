import { initClient } from ".";

const client = initClient();

export default client;

/**
 *
 */
client.onSigIn((app, token) => {
  localStorage.setItem(app, token);
});

client.onExit((app) => {
  localStorage.removeItem(app);
});

const skipError = () => {
  /**Ignore error */
};

const agape = localStorage.getItem("agape");
const shop = localStorage.getItem("shop");

if (agape) {
  client.authenticate({ agape }).catch(skipError);
}

if (shop) {
  client.authenticate({ shop }).catch(skipError);
}
