import { Tooltip } from "bootstrap";
import { useEffect, useRef } from "react";

export default function useToolTip<T extends Element>(content?: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!content || !ref.current) {
      return;
    }

    // Initialize tooltip for button
    const current = new Tooltip(ref.current);

    // Show the tooltip
    current.show();

    return () => {
      // Clean up tooltip when component is unmounted
      current.dispose();
    };
  }, [content]);

  return ref;
}
