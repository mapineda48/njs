import { DataTypes } from "sequelize";
import { schema } from "./type";

import type { Sequelize, Model } from "sequelize";

export default function define(seq: Sequelize) {
  return seq.define<MyModel>(
    "VapidDetail",
    {
      publicKey: {
        type: DataTypes.STRING(50),
        primaryKey: true,
      },
      privateKey: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    { tableName: "vapid_detail", schema }
  );
}

/**
 * Types
 */
export type MyModel = Model<VapidDetails>;

export interface VapidDetails {
  publicKey: string;
  privateKey: string;
  subject: string;
}
