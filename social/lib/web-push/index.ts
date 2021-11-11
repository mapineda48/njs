import webPush from "web-push";
import ms from "ms";

import type { Payload } from "./type";
import type { Cache } from "../cache";
import type { Model } from "../models";
import type { VapidDetails } from "../models/VapidDetails";

/**
 * To avoid a flood of messages, there must be a 10 minute
 * difference between message and message.
 */
const timeLimit = ms("10m");

export default function prepareToSend(
  cache: Cache,
  model: Model,
  vapidDetails: VapidDetails
) {
  return async function sendNotify(payload: Payload) {
    const lastMessage = await cache.get("lastMessage");

    const timeMessage = Date.now();

    if (lastMessage) {
      const elapsed = timeMessage - parseInt(lastMessage);

      if (elapsed < timeLimit) {
        return Promise.resolve();
      }
    }

    const subs = await model.subscription.findAll();

    if (!subs.length) return;

    const data = JSON.stringify(payload);

    subs.forEach((sub) => {
      webPush
        .sendNotification(sub.get(), data, {
          vapidDetails,
        })
        .catch((err) => {
          /**
           * push subscription has unsubscribed or expired.
           */
          if (err.statusCode === 410) {
            sub.destroy().catch(console.error);
          }

          console.error(err);
        });
    });

    await cache.set("lastMessage", timeMessage.toString());
  };
}

/**
 * Types
 */
export type Notify = ReturnType<typeof prepareToSend>;
