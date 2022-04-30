import { DataTypes } from "sequelize";
import { SCHEMA } from "./type";

import type { Sequelize, Model } from "sequelize";

export default function define(seq: Sequelize) {
  return seq.define<MyModel>(
    "Message",
    {
      room: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      writeBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      data: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    { tableName: "message", schema: SCHEMA }
  );
}

/**
 * Types
 */
export type MyModel = Model<Message>;

export interface Message {
  room: string;
  writeBy: string;
  data: string;
}
