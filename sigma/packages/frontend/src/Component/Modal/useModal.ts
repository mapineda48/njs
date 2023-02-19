import { Modal } from "bootstrap";
import { useEffect, useRef } from "react";

export function useModal<T extends HTMLElement>(onHidden: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const el = ref.current;

    const modal = new Modal(el, {
      backdrop: true,
      focus: true,
      keyboard: true,
    });

    modal.show();

    el.addEventListener("hidden.bs.modal", onHidden);

    return () => {
      el.removeEventListener("hidden.bs.modal", onHidden);
    };
  }, [onHidden]);

  return ref;
}

/**
 * Types
 */
