if ('serviceWorker' in navigator) {
  console.log('service worker supported');
  navigator.serviceWorker.register('./life-cycle-sw.js', { scope: './' }).then(
    function (registration) {
      // Si es exitoso
      console.log('App: SW registered');

      if (registration.installing) {
        console.log('App: SW installing');
      } else if (registration.waiting) {
        //entramos
        console.log('App: SW installed - waiting activation');
      } else if (registration.active) {
        console.log('App: SW active');

        // MESSAGE little practice
        navigator.serviceWorker.addEventListener('message', function (e) {
          console.log(
            `App: The SW sent me a message: ${e.data.message}`,
            e.data.payload
          );
        });

        navigator.serviceWorker.controller.postMessage({
          message: 'Hi Service Worker',
          payload: { argOne: 3 },
        });
      }
    },
    function (err) {
      // Si falla
      console.log('App: SW failed: ', err);
    }
  );
} else {
  console.error('No Service Worker available');
}
