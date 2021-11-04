import { DataTypes } from "sequelize";

import type { Model } from "sequelize";
import type { Options } from ".";


/**
 * @swagger
 * components:
 *  schemas:
 *    Person:
 *      type: object
 *      required:
 *        - fullName
 *        - email
 *        - age
 *      properties:
 *        id:
 *          type: number
 *          description: auto generate id person
 *        fullName:
 *          type: string
 *          description: full name person to add
 *        email:
 *          type: string
 *          description: email to contact person
 *        age:
 *          type: number
 *          description: age person
 *      example:
 *        id: 1
 *        fullName: Mario Calderon
 *        email: foo@gmail.com
 *        age: 25
 */
export default function define(opt: Options) {
  const { sequelize, schema } = opt;

  return sequelize.define<Model<Person>>(
    "Person",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      schema,
      tableName:'person'
    }
  );
}

/**
 * Types
 */

export interface Person {
  id: number;
  fullName: string;
  email: string;
  age: number;
}
