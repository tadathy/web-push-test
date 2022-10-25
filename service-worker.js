self.addEventListener('push', function (event) {
  const title = 'WebPush Test';
  const options = {
    body: event.data.text(),
    tag: title,
    icon: '',
    badge: ''
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  event.waitUntil(clients.matchAll({
    type: "window",
    includeUncontrolled: true
  }).then(function (clientList) {
    if (data.WebUrl) {
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
        return client.navigate(data.WebUrl);
      }
      else {
        event.notification.close();
        return clients.openWindow(data.WebUrl);
      }
    }
  }));
});

self.addEventListener('install', (event) => {
  console.log('service worker install');
});
