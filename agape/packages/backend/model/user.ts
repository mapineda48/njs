import { Sequelize, Model, DataTypes } from "sequelize";
import { NameModel, IModel } from "../integration/model/user";

export default function define(seq: Sequelize) {
  return seq.define<Model<IModel>>(
    NameModel,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      //paranoid: true
    }
  );
}

/**
 * Types
 */
export type IUser = ReturnType<typeof define>;
