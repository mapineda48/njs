import { Sequelize } from "sequelize";

export async function clearDataDemo(seq: Sequelize) {
  await waitAuthenticate(seq);
  await seq.dropSchema("public", {});
  await seq.createSchema("public", {});
  return seq;
}

export async function waitAuthenticate(seq: Sequelize): Promise<void> {
  try {
    await seq.authenticate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const code = error?.original?.code;

    if (code !== "57P03" && code !== "ECONNREFUSED") {
      throw error;
    }

    /**
     * In docker compose maybe database is not ready when try connect
     * try again
     */
    console.log("the database system is starting up");
    await wait(500);
    return waitAuthenticate(seq);
  }
}

export async function wait(time: number) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}
