self.addEventListener('push', function (event) {
  const payload = JSON.parse(event.data.text());
  const title = 'WebPush Test';
  const options = {
    body: payload.body,
    data: payload.data,
    tag: Math.random().toString(32).substring(2)
  };
  //navigator.setAppBadge(99);
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
//  event.notification.close();
//  if (clients.openWindow && event.notification.data.url) {
//    event.waitUntil(clients.openWindow(event.notification.data.url));
//  }
event.waitUntil(clients.matchAll({
    type: "window",
    includeUncontrolled: true
}).then(function (clientList) {
    if (event.notification.data.url) {
        let client = null;

        for (let i = 0; i < clientList.length; i++) {
            let item = clientList[i];

            if (item.url) {
                client = item;
                break;
            }
        }

        if (client && 'navigate' in client) {
            client.focus();
            event.notification.close();
            return client.navigate(event.notification.data.url);
        }
        else {
            event.notification.close();
            // if client doesn't have navigate function, try to open a new browser window
            return clients.openWindow(event.notification.data.url);
        }
    }
}));
});

self.addEventListener('install', (event) => {
  console.log('service worker install');
});
