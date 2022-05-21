import { UUIDV4, DataTypes } from "sequelize";
import { SCHEMA } from "./type";

import type { Sequelize, Model } from "sequelize";

export default function define(seq: Sequelize) {
  return seq.define<MyModel>(
    "Miguel",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      isOnline: {
        type: DataTypes.BOOLEAN,
      },
      publicKey: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      privateKey: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastNotification: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      lastLoginAttempt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      loginAttempts: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
    },
    { tableName: "miguel", schema: SCHEMA }
  );
}

/**
 * Types
 */
export type MyModel = Model<Miguel>;

export interface Miguel {
  id: string;
  isOnline: boolean;
  publicKey: string;
  privateKey: string;
  subject: string;
  lastNotification: number;
  lastLoginAttempt:number;
  loginAttempts:number
}
