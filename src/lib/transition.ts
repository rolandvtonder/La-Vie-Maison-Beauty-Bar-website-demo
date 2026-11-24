/**
 * Page-to-page navigation goes through the curtain: the three slabs wipe in
 * from the right, the next page loads underneath, and its own curtain wipes
 * out to the left. The Curtain component registers the real handler.
 */
let handler: ((href: string) => void) | null = null;

export function registerCurtain(fn: ((href: string) => void) | null) {
  handler = fn;
}

export function go(href: string) {
  if (handler) handler(href);
  else window.location.href = href;
}

/** True when `href` points at a different page of this site. */
export function isInternalPage(a: HTMLAnchorElement): boolean {
  if (a.target && a.target !== '_self') return false;
  if (a.hasAttribute('download')) return false;
  const url = new URL(a.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  return url.pathname !== window.location.pathname;
}
