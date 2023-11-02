export function useRelative(): (...paths: string[]) => void;

export function useRoute(...paths: string[]): {
  changeTo: () => void;
  inRoute: boolean;
};

export function Redirect(props: {
  relative?: boolean;
  to: string;
}): JSX.Element | null;

export function Outlet(): JSX.Element | null;

export default function Router(BaseUrl?: FComponent): Route;

type Route = {
  (): JSX.Element;
  use: (pattern: string, Component: FComponent) => void;
};

type FComponent = (props: unknown) => JSX.Element;
