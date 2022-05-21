import { login, existsSession } from "../../frontend/src/miguel/http";

(async () => {
  const session = (await existsSession()) ?? (await login("foo", "12345"));

  console.log("connect miguel");

  session.onError(console.error);

  session.onGuestOnline((room, isOnline) => {
    console.log({ room, isOnline });

    if (!isOnline) {
      return;
    }

    session.addMessage(room, "Hi There!!!");
  });

  session.onAddMessage((message) => {
    console.log(message);
  });

  session.ready().then((rooms) => {
    console.log({ rooms });

    rooms.forEach((room) => {
      session.addMessage(room, "Hi There!!!");
    });
  });
})().catch(console.error);
