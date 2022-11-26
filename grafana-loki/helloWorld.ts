import axios from "axios";

const unixEpochInNanoseconds = Date.now() * 1000000;

const dateLog = unixEpochInNanoseconds.toString();

const payload = {
  streams: [
    {
      stream: { level: "info", app: "foo" },
      values: [[dateLog, '{"level":"info","message":"Hello world!"}']],
    },
  ],
};

axios
  .post("http://localhost:3100/loki/api/v1/push", payload)
  .then(() => console.log("sucess"))
  .catch(console.error);
