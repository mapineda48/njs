export default interface SigIn {
  (token: string): Promise<Auth>;
  (username: string, password: string): Promise<Auth>;
}

export interface Auth {
  token: string;
  user: User;
}

export interface User {
  id: number;
  fullName: string;
  avatarUrl: string;
}
