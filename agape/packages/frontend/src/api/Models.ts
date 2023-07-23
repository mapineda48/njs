import { AxiosInstance } from "axios";
import User, { IUser } from "./Model/User";
import Role, { IRole } from "./Model/Role";
import EmployeeRole, { IEmployeeRole } from "./Model/EmployeeRole";
import Employee, { IEmployee } from "./Model/Employee";
import DocumentType, { IDocumentType } from "./Model/DocumentType";

export class Models {
  public user: IUser;
  public role: IRole;
  public employeeRole: IEmployeeRole;
  public employee: IEmployee;
  public documentType: IDocumentType;

  constructor(axios: AxiosInstance) {
    this.user = new User(axios);
    this.role = new Role(axios);
    this.employeeRole = new EmployeeRole(axios);
    this.employee = new Employee(axios);
    this.documentType = new DocumentType(axios);
  }
}
