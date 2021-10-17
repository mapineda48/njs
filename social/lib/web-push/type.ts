export interface Payload {
  title: string;
  body: string;
}

export interface Subscription {
  endpoint: string;
  expirationTime: unknown;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface VapidKeys {
  publicKey: string;
  privateKey: string;
}
