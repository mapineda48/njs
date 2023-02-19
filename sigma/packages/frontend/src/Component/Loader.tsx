export default function Loader({ enabled, children }: Props) {
  if (!enabled) {
    return children;
  }

  return <div>Loading...</div>;
}

/**
 * Types
 */

export interface Props {
  enabled: boolean;
  children: JSX.Element;
}
