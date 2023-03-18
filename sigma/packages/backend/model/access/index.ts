import { Sequelize, Model, DataTypes } from "sequelize";
import type { Model as AccessModel } from "./type";

export default function define(seq: Sequelize) {
  const Access = seq.define<Model<AccessModel>>(
    "Access",
    {
      accessId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      //paranoid: true
    }
  );

  const { Employee } = seq.models;

  Employee.hasOne(Access, {
    foreignKey: {
      name: "employeeId",
      allowNull: false,
    },
  });
  Access.belongsTo(Employee);

  return Access;
}

/**
 * Types
 */
export type Access = ReturnType<typeof define>;
