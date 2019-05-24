importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

/*const navigationStrategy = workbox.strategies.networkFirst({
  cacheName: 'nav-cache',
  // Use the network unless things are VERY slow
  // This gives the network time to get up.
  networkTimeoutSeconds: 15,
  plugins: [
    new workbox.expiration.Plugin({
      // Cache for a maximum of three days
      maxAgeSeconds: 7 * 24 * 60 * 60,
    })
  ],
});

const navigationRoute = new workbox.routing.NavigationRoute(navigationStrategy, {});
workbox.routing.registerRoute(navigationRoute);*/

workbox.routing.registerRoute(
  // Cache files without a query string
  /^[^?]+$/,
  // Use the cache if it's available
  workbox.strategies.networkFirst({
    cacheName: 'everything-network-first',
    // Use the network unless things are VERY slow
    // This gives the network time to get up.
    networkTimeoutSeconds: 15,
    plugins: [
      new workbox.expiration.Plugin({
        // Cache for a maximum of three days
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
