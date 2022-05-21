import { DataTypes, UUIDV4 } from "sequelize";
import { SCHEMA } from "./type";

import type { Sequelize, Model } from "sequelize";

export default function define(seq: Sequelize) {
  return seq.define<MyModel>(
    "Guest",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      isOnline: {
        type: DataTypes.BOOLEAN,
      },
      origin: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      demo: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      userAgent: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      sockets: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    { tableName: "guest", schema: SCHEMA }
  );
}

/**
 * Types
 */
export type MyModel = Model<Guest>;

export interface Guest {
  id: string;
  origin: string;
  demo: string;
  fullName: string;
  isOnline: boolean;
  address: string;
  userAgent: string;
  sockets: string[];
}
