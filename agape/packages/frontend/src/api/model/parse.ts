import { parseRecord } from "./util";

function parseUser(user: object) {
  const record = parseRecord(user);

  if ("birthday" in record) {
    record.birthday = new Date(record.birthday as string);
  }

  return record;
}

const mapParse = {
  user: parseUser,
};

export default mapParse as any;
