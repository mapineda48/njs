import { Sequelize, Model, DataTypes } from "sequelize";
import type { Model as EmployeeModel } from "./type";

export default function define(seq: Sequelize) {
  const Employee = seq.define<Model<EmployeeModel>>(
    "Employee",
    {
      employeeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      //paranoid: true
    }
  );

  const { User } = seq.models;

  User.hasOne(Employee, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
  });
  Employee.belongsTo(User, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
  });

  return Employee;
}

/**
 * Types
 */
export type Employee = ReturnType<typeof define>;
