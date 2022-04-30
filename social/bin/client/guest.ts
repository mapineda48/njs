import { createSession } from "../../frontend/src/guest/http";

createSession()
  .then((session) => {
    console.log("guest connect!!");

    session.onAddMessage(console.log);

    session.onError(console.error);

    session.onMiguelOnline((isOnline) => {
      console.log({ isOnline });

      if (!isOnline) {
        return;
      }

      session.addMessage("Hello World");
    });

    session.getMessages(1).then(console.log).catch(console.error);
  })
  .catch(console.error);
