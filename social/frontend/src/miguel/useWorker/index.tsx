import { useSession } from "../Session";

const path = "/social/miguel/sw.js";

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

  const serviceWorker = await navigator.serviceWorker.register(path);

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
