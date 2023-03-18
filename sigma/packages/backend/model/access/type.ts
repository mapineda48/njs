export interface Data {
  username: string;
  password: string;
}

export interface Model extends Data {
  accessId: number;
}

export interface Record extends Model {
  createdAt: Date;
  updatedAt: Date;
}
