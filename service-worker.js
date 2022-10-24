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
  event.waitUntil(
    clients.openWindow('pwa+test://?test1=test2')
  );
});

self.addEventListener('install', (event) => {
  console.log('service worker install');
});
