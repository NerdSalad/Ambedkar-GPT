// Tiny pub-sub singleton that signals when the app's opening animation has
// finished. Components that should only kick off *after* the splash finishes
// (e.g. hero CountUp) wait on this instead of running immediately on mount.
let ready = false;
const listeners = new Set();

export function markAppReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((cb) => {
    try { cb(); } catch { /* swallow listener errors */ }
  });
  listeners.clear();
}

export function isAppReady() {
  return ready;
}

// Subscribe to the "ready" event. If already ready, the callback fires
// synchronously. Returns an unsubscribe function.
export function onAppReady(cb) {
  if (ready) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
