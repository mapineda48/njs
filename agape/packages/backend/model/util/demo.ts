import { Sequelize } from "sequelize";
import { waitAuthenticate } from ".";
import Database from "..";
import userMock from "./user.json";

const end = new Date();
const start = new Date(end);
start.setDate(start.getDate() - 59);

const users: any[] = userMock.map((user) => ({
  ...user,
  createdAt: randomDate(start, end),
}));

export async function populateDemoData() {
  await Promise.all(users.map((user) => Database.user.create(user)));
}

export function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export async function clearDataDemo(seq: Sequelize) {
  await waitAuthenticate(seq);
  await seq.dropSchema("public", {});
  await seq.createSchema("public", {});
  return seq;
}
