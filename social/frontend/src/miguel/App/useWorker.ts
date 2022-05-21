import { MIGUEL_SW, MIGUEL_SCOPE } from "@sw";
import { useSession } from "./Session";

const path = MIGUEL_SW;
const scope = MIGUEL_SCOPE;

export default function useNotify() {
  const session = useSession();

  return async function register() {
    if (!("serviceWorker" in navigator)) {
      console.log("Service workers are not supported.");
      return Promise.resolve();
    }
    console.log("Service working is supported");

    const publicKey = await session.getPublicKey();

    const [sub, old] = await subscribe(publicKey);

    await session.saveSubscription(sub);

    if (old) {
      await session.removeSubscription(old);
    }

    console.log("ready to receive web push");
  };
}

async function unregistergit() {
  const registrations = await navigator.serviceWorker.getRegistrations();

  if (!registrations.length) {
    return;
  }

  await Promise.all(
    registrations.map(async (reg) => {
      const sub = await reg.pushManager.getSubscription();

      if(sub){
        await sub.unsubscribe();
      }

      await reg.unregister();
    })
  );
}

async function subscribe(applicationServerKey: string): Promise<Res> {
  if (process.env.NODE_ENV === "development") {
    console.log("Skip subscribe worker");

    return Promise.resolve<any>([null]);
  }
  console.log("trying subscribe");

  const oldServiceWorker = await navigator.serviceWorker.getRegistration(path);

  let oldSub: PushSubscription | null = null;

  if (oldServiceWorker) {
    console.log("found old worker");
    const subscription = await oldServiceWorker.pushManager.getSubscription();

    if (subscription) {
      console.log("unsubscribe subscription");
      await subscription.unsubscribe();
      oldSub = subscription;
    }

    console.log("unregister old worker");
    await oldServiceWorker.unregister();
  }

  const serviceWorker = await navigator.serviceWorker.register(path, {
    scope,
  });

  console.log("subscribing....");
  await navigator.serviceWorker.ready;

  const push = await serviceWorker.pushManager.subscribe({
    // 3
    userVisibleOnly: true,

    applicationServerKey,
  });
  console.log("subscribed. ", push);

  return [push, oldSub];
}

/**
 * Types
 */
type Res = [PushSubscription, PushSubscription | null];
