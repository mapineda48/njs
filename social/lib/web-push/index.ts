import webPush from "web-push";

import type { Store } from "../store";
import type { Payload } from "./type";

const subject = "mailto:example@yourdomain.org";

let vapidDetails: VapidDetails = null as any;

export function prepareToSend(store: Store) {
  return async function sendNotify(payload: Payload) {
    if (!vapidDetails) {
      const vapidKeys = await store.getVapidKeys();

      vapidDetails = { subject, ...vapidKeys };
    }

    const subs = await store.selectSubscriptions();

    const data = JSON.stringify(payload);

    subs.forEach((sub) => {
      webPush.sendNotification(sub, data, { vapidDetails });
    });
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
