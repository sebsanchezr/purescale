/**
 * Single declaration of the Meta Pixel global.
 *
 * Three components each declared this inline, and TypeScript rejects the merge
 * when the modifiers differ (one had it required, two optional). It is genuinely
 * optional, the pixel is injected by a script tag that may be blocked, so every
 * call site should use `window.fbq?.(...)` or guard first.
 */
export {}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}
