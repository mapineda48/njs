import { Sequelize, Model, DataTypes } from "sequelize";
import type { SettingModel } from "./type";

export default function define(seq: Sequelize) {
  return seq.define<Model<SettingModel>>(
    "Setting",
    {
      idSetting: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clave: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      valor: {
        type: DataTypes.JSONB,
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
export type Setting = ReturnType<typeof define>;
