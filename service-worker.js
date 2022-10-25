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
  event.notification.close();
  if (clients.openWindow && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});

self.addEventListener('install', (event) => {
  console.log('service worker install');
});
