import { DataTypes } from "sequelize";
import { SCHEMA } from "./type";

import type { Sequelize, Model } from "sequelize";
import type { PushSubscription } from "web-push";

export default function define(seq: Sequelize) {
  return seq.define<MyModel>(
    "Subscription",
    {
      endpoint: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      keys: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    { tableName: "subscription", schema: SCHEMA }
  );
}

/**
 * Types
 */
export type MyModel = Model<PushSubscription>;
