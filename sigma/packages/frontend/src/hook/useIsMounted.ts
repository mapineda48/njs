import { useCallback, useEffect, useRef } from "react";

export default function useIsMounted() {
  const isMount = useRef(false);

  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  });

  const isMounted = useCallback(() => isMount.current, [isMount]);

  return isMounted;
}
