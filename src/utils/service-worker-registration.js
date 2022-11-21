if ('serviceWorker' in navigator) {
  console.log('service worker supported');
  navigator.serviceWorker.register('./life-cycle-sw.js', { scope: './' }).then(
    function (registration) {
      console.log('App: SW registered');

      if (registration.installing) {
        console.log('App: SW installing');

        //capture state life
        registration.addEventListener('updatefound', () => {
          // A wild service worker has appeared in registration.installing!
          const newWorker = registration.installing;
          console.log('App: newWorker --> ', newWorker.state);
          // "installing" - the install event has fired, but not yet complete
          // "installed"  - install complete
          // "activating" - the activate event has fired, but not yet complete
          // "activated"  - fully active
          // "redundant"  - discarded. Either failed install, or it's been
          //                replaced by a newer version

          newWorker.addEventListener('statechange', () => {
            console.log(
              'App: newWorker.state has changed --> ',
              newWorker.state
            );
          });
        });
      } else if (registration.waiting) {
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
