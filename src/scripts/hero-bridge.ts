import { bootOnReady } from '../lib/dom/boot';

const ANIMATED =
  '.hero-bridge__beam, .hero-bridge__pan-level, .hero-bridge__dollar, .hero-bridge__fly, .hero-bridge__money, .hero-bridge__orb, .hero-bridge__logo-scale, .hero-bridge__logo-fill, .hero-bridge__logo-stroke, .hero-bridge__logo-check, .hero-bridge__logo-pulse, .hero-bridge__bill, .hero-bridge__track, .hero-bridge__flow';

/** iOS Safari often freezes SVG CSS animations until a forced restart. */
function restartSvgAnimations(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(ANIMATED).forEach((el) => {
    const { animationName, animationDuration, animationTimingFunction, animationDelay, animationIterationCount } =
      getComputedStyle(el);
    if (!animationName || animationName === 'none') return;
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = `${animationName} ${animationDuration} ${animationTimingFunction} ${animationDelay} ${animationIterationCount}`;
  });
}

function initHeroBridge() {
  const bridge = document.querySelector<HTMLElement>('.hero-bridge');
  if (!bridge) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const kick = () => {
    restartSvgAnimations(bridge);
    requestAnimationFrame(() => restartSvgAnimations(bridge));
  };

  const isTouch =
    window.matchMedia('(max-width: 960px)').matches ||
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  if (isTouch && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          kick();
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '40px 0px' },
    );
    obs.observe(bridge);
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) kick();
  });
}

bootOnReady(initHeroBridge);
