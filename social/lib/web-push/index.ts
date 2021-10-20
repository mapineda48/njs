import webPush, { VapidKeys } from "web-push";
import ms from "ms";

import type { Store } from "../store";
import type { Payload } from "./type";

const subject = "mailto:example@yourdomain.org";
let vapidDetails: VapidDetails = null as any;

/**
 * To avoid a flood of messages, there must be a 10 minute
 * difference between message and message.
 */
const timeLimit = ms("10m");

export function prepareToSend(store: Store) {
  return async function sendNotify(payload: Payload) {
    const lastMessage = await store.map.get<number>("lastMessage");

    const timeMessage = Date.now();

    if (lastMessage) {
      const elapsed = timeMessage - lastMessage;

      if (elapsed < timeLimit) {
        return Promise.resolve();
      }
    }

    if (!vapidDetails) {
      const vapidKeys = await store.map.get<VapidKeys>("vapidKeys");

      if (!vapidKeys) {
        const vapidKeys = webPush.generateVAPIDKeys();

        await store.map.set("vapidKeys", vapidKeys);

        vapidDetails = { subject, ...vapidKeys };
      } else {
        vapidDetails = { subject, ...vapidKeys };
      }
    }

    const subs = await store.subscription.select();

    if (!subs.length) return;

    const data = JSON.stringify(payload);

    subs.forEach((sub) => {
      webPush.sendNotification(sub, data, { vapidDetails });
    });

    await store.map.set("lastMessage", timeMessage);
  };
}

/**
 * Types
 */
interface VapidDetails {
  publicKey: string;
  privateKey: string;
  subject: string;
}
