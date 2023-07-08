import { Sequelize, Model, DataTypes } from "sequelize";
import { NameModel as UserModel } from "../integration/model/user";
import { NameModel as RoleModel } from "../integration/model/role";
import { NameModel as RoleEmployeeModel } from "../integration/model/employeeRole";
import { NameModel, IModel } from "../integration/model/employee";

export default function define(seq: Sequelize) {
  const user = seq.models[UserModel];
  const role = seq.models[RoleModel];

  const employee = seq.define<Model<IModel>>(
    NameModel,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      //paranoid: true
    }
  );

  user.hasOne(employee);
  employee.belongsTo(user);

  employee.belongsToMany(role, { through: RoleEmployeeModel });
  role.belongsToMany(employee, { through: RoleEmployeeModel });

  return employee;
}

/**
 * Types
 */
export type IEmployee = ReturnType<typeof define>;
