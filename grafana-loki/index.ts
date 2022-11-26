import { logInfo } from "./lib/basic";

logInfo("bar", { message: "Hello world!" })
  .then(() => console.log("sucess"))
  .catch(console.error);
