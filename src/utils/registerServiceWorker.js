// Registers /service-worker.js only in production builds, so local
// `npm start` development is never affected by stale cached files.
export const registerServiceWorker = () => {
  if (process.env.NODE_ENV !== "production") return;
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .catch(() => {
        // Non-fatal — the app works fine online-only if this fails.
      });
  });
};
