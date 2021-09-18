/**
 * https://stackoverflow.com/questions/29983786/blocked-a-frame-of-origin-null-from-accessing-a-cross-origin-frame-chrome/65234451
 * https://stackoverflow.com/questions/935127/how-to-access-parent-iframe-from-javascript
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/frameElement
 */
export const iframe = window.frameElement as HTMLIFrameElement | null;

export const inIframe = Boolean(iframe);

const minSize = "120px";

/**
 * Prepare iframe to display chat, apply the styles.
 */
export function prepareIframe() {
  if (!iframe) return;

  iframe.style.width = minSize;
  iframe.style.height = minSize;
  iframe.style.position = "fixed";
  iframe.style.bottom = "1em";
  iframe.style.right = "1em";
  iframe.style.zIndex = "1000";
  iframe.style.maxWidth = "350px";
  iframe.style.maxHeight = "400px";
}

let isOpen = false;

export function open() {
  if (!iframe || isOpen) return;

  iframe.style.width = "90vw";
  iframe.style.height = "90vh";

  isOpen = true;
}

export function close() {
  if (!iframe || !isOpen) return;

  iframe.style.width = minSize;
  iframe.style.height = minSize;

  isOpen = !isOpen;
}

export function toggle(state: boolean) {
  if (!iframe || state === isOpen) return;

  if (state) return open();

  close();
}
