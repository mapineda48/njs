import lodash from "lodash";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import path from "../path.json";
import custom from "./custom";
import { IFrontEnd } from "../index";
import { IAgape } from "../agape";
import { IShop } from "../shop";
import { Authentication } from "../../public";

const baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";

const { agape, shop, authenticate, ...open } = lodash.merge(path, custom);

export function initClient() {
  const client: any = initApi(create(), open);
  const onExit = new Set<Exit>();
  const onSignIn = new Set<SigIn>();

  client.authenticate = async (credential: Authentication) => {
    const [app, api, token] = await sigin(credential);
    client[app] = api;

    onSignIn.forEach((cb) => cb(app, token));

    return token;
  };

  client.logout = (credential: Authentication) => {
    const [app] = Object.keys(credential);
    delete client[app];

    onExit.forEach((cb) => cb(app));
  };

  client.onExit = (cb: Exit) => {
    onExit.add(cb);

    return () => {
      onExit.delete(cb);
    };
  };

  client.onSigIn = (cb: SigIn) => {
    onSignIn.add(cb);

    return () => {
      onSignIn.delete(cb);
    };
  };

  return client as IClient;
}

/**
 *
 */
export async function sigin(credential: Authentication) {
  const { data: token } = await create().post<string>(authenticate, [credential]);
  const [app] = Object.keys(credential);
  const [route] = Object.entries(path).find(
    ([path]) => path === app
  ) as unknown[];

  const session = create({ headers: { [app]: token } });
  const api = initApi(session, route as IMap);

  return [app, api, token] as const;
}

/**
 *
 */
export function initApi(axios: AxiosInstance, map: IMap = open) {
  const api: unknown = Object.fromEntries(
    Object.entries(map).map(([methodName, route]: any) => {
      if (typeof route === "string") {
        const method = (...args: unknown[]) => {
          return axios.post(route, args).then((res) => res.data);
        };

        return [methodName, method];
      }

      if (typeof route === "function") {
        return [methodName, (...args: unknown[]) => route(axios, ...args)];
      }

      return [methodName, initApi(axios, route)];
    })
  );

  return api;
}

export function create(config?: CreateAxiosDefaults) {
  return axios.create({
    ...config,
    baseURL,
  });
}

/**
 * Types
 */
interface IClient extends Omit<IFrontEnd, "agape" | "shop"> {
  agape?: IAgape;
  shop?: IShop;
  logout(authenticate: Authentication): void;
  onExit(cb: Exit): () => void;
  onSigIn(cb: SigIn): () => void;
}

interface IMap {
  [K: string]: string | IMap;
}

type Exit = (app: string) => void;
type SigIn = (app: string, token: string) => void;
