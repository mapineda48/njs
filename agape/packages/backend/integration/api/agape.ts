import * as employee from "../model/employee";

export interface IAgape {
  upload(file: File, filename: string): Promise<string>;
  employee: IEmployee;
  client: {
    employee: IEmployee;
  };
}

export interface IEmployee {
  findAll(): Promise<employee.IRecord[]>;
}
