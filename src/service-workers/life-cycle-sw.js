self.addEventListener('install', (e) => {
  console.log('SW: installing...');
  e.waitUntil(
    new Promise((resolve, reject) => {
      console.log('SW: before finish installation');
      resolve();
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log('SW: activating...');

  e.waitUntil(
    new Promise((resolve, reject) => {
      console.log('SW: before finish activation');
      resolve();
    })
  );
});

self.addEventListener('fetch', (e) => {
  // all requests within the specifyed scope
  console.log('SW: FETCH captured -->', e);
});

self.addEventListener('sync', (e) => {
  // experimental technology, MDN says
  // triggered when network is available
  console.log('SW: SYNC captured -->', e);
});

self.addEventListener('periodicsync', (e) => {
  // experimental technology, MDN says
  // triggered when network is available
  console.log('SW: PERIODIC-SYNC captured -->', e);
});

self.addEventListener('push', (e) => {
  console.log('SW: PUSH notification event captured -->', e);
  // show notification if is possible
  self.registration.showNotification('Hola Jou', {
    body: 'oh my lord!',
    actions: [
      { action: () => console.log('action triggered'), title: 'buy now!' },
    ],
  });
  // capture clickNotification event
});

self.addEventListener('message', (e) => {
  console.log('SW: MESSAGE captured -->', e);

  console.log(`SW: App sent me a message: ${e.data.message}`, e.data.payload);

  e.source.postMessage({
    message: 'Hi App',
    payload: {
      argOne: { foo: 'bar' },
    },
  });
});
