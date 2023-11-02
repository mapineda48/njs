import Loading from "App/Loading";
import { Suspense, lazy } from "react";

export default function doLazy(cb: any) {
  const LazyComponent = lazy(cb);

  return () => (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
