import axios from "axios";

const URL = "http://localhost:3100/loki/api/v1/push";

export function logInfo(app: string, message: any) {
  return axios.post(URL, prepareLog(app, message));
}

export function prepareLog(app: string, message: any) {
  return {
    streams: [
      {
        stream: { level: "info", app },
        values: [prepareMessage(message)],
      },
    ],
  };
}

export function prepareMessage(value: any) {
  const dateLog = getUnixEpochInNanoseconds();

  return [dateLog, JSON.stringify(value)];
}

export function getUnixEpochInNanoseconds() {
  const now = Date.now() * 1000000;

  return now.toString();
}
