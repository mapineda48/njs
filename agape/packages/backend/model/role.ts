import { Sequelize, Model, DataTypes } from "sequelize";
import { NameModel, IModel } from "../integration/model/role";

export function create(seq: Sequelize) {
  const role = seq.define<Model<IModel>>(
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
    },
    {
      //paranoid: true
    }
  );

  return role;
}

export { NameModel };

/**
 * Types
 */
export type IRole = ReturnType<typeof create>;