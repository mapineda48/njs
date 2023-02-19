export interface Data {
  fullName: string;
  email: string;
  city: string;
  department: string;
  birthday: Date;
}

export interface Model extends Data {
  userId: number;
}

export interface Record extends Model {
  createdAt: Date;
  updatedAt: Date;
}
