import {
  createSocket as createMiguel,
  Socket as Miguel,
} from "../frontend/src/socket/miguel";
import { createGuest, Guest } from "../frontend/src/socket/guest";
import { NAMESPACE } from "../lib/socket/type";
import { prod, client } from "../frontend/src/http";
import * as e from "../lib/socket/event";

prod.url = "http://localhost:3000/social/miguel/";

const uri = `http://localhost:3000${NAMESPACE}`;

let miguel: Miguel | null = null;

const action = new Map();

const guest = new Map<string, Guest>();

action.set("miguel", (type: keyof Miguel) => {
  if (!miguel) return console.log(`miguel not is connect`);

  (miguel as any)[type]();
});

action.set("disconnect", (name: string) => {
  const client = guest.get(name);

  if (!client) return;

  client.socket.disconnect();
  guest.delete(name);

  console.log(`${name} disconnect`);
});

action.set("connect", (name: string) => {
  const client = createGuest(uri);

  guest.set(name, client);

  client.socket.on("connect", () => {
    console.log(`${name} connect`);
  });

  client.onIsOnlineMiguel((id) => {
    console.log(`miguel online ${id}`);
  });

});

action.set("miguel-off", () => {
  if (!miguel) return;

  miguel.disconnect();
  miguel = null;
});

action.set("miguel-on", async () => {
  try {
    const { token } = await client.login("foo", "12345");

    miguel = createMiguel(token, uri);

    miguel.socket.on("connect", () => {
      console.log("miguel connect");
    });
  } catch (error) {
    console.log(error);
  }
});

process.stdin.on("data", (buff) => {
  const [type, ...args] = buff.toString().replace(/\n/, "").split(" ");

  const task = action.get(type);

  if (task) {
    task(...args);
    return;
  }

  console.log(`not found type ${type}`);
});
