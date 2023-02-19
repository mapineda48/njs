export default function Error({ error, children }: Props) {
  if (!error) {
    return children;
  }

  return <div>Ups... Something wrong</div>;
}

/**
 * Types
 */

export interface Props {
  error: any;
  children: JSX.Element;
}
