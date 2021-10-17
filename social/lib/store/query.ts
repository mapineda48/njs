import type { VapidKeys, PushSubscription } from "web-push";

const vapidKeysId = "vapidKeys";

export const vapidKeys = {
  select: `SELECT "data" FROM "social"."document" WHERE "id"='${vapidKeysId}'`,
  insert(vapidKeys: VapidKeys) {
    const data = JSON.stringify(vapidKeys);

    return `INSERT INTO "social"."document"("id","data") VALUES ('${vapidKeysId}','${data}'::jsonb)`;
  },
};

export const subscription = {
  select: `SELECT "data" FROM "social"."document" WHERE "id" != '${vapidKeysId}'`,
  insert(sub: PushSubscription) {
    const data = JSON.stringify(sub);

    return `INSERT INTO "social"."document"("id","data") VALUES ('${sub.endpoint}','${data}'::jsonb)`;
  },
  delete(sub: PushSubscription) {
    return `DELETE FROM "social"."document" WHERE "id" = '${sub.endpoint}'`;
  },
};
