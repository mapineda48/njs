// eslint-disable-next-line no-restricted-globals
const sw: ServiceWorkerGlobalScope = self as any;

const url = new URL(sw.location.href);

sw.addEventListener("push", function (e) {
  if (!e || !e.data) return;

  const message = e.data.json(); // 1

  const options = {
    // 2
    body: message.body,
    // social page miguel
    data: url.origin + "/social/miguel",
    actions: [
      {
        action: "Detail",
        title: "Detalles",
      },
    ],
  };

  e.waitUntil(sw.registration.showNotification(message.title, options)); // 3
});

sw.addEventListener("notificationclick", function (e) {
  //console.log("Notification click Received.", e.notification.data);

  e.notification.close(); // 1
  e.waitUntil(sw.clients.openWindow(e.notification.data)); // 2
});
