import { DataTypes } from "sequelize";
import { schema } from "./type";

import type { Sequelize, Model as M, FindOptions } from "sequelize";

export default function define(seq: Sequelize) {
  return seq.define<Model>(
    "Person",
    {
      fullName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      city: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    { schema }
  );
}

/**
 * Types
 */
export type FindOpt = FindOptions<Model["_attributes"]>;

export type Model = M<Person>;

export type Record = Required<Person>;

export interface Person {
  id?: number;
  fullName: string;
  email: string;
  city: string;
  department: string;
  createdAt?: string;
  updatedAt?: string;
}
