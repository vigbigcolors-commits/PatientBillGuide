/** Run fn when DOM is ready (works with Astro deferred module scripts). */
export function bootOnReady(fn: () => void): void {
  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
}
