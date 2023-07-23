import { Sequelize, Model, DataTypes } from "sequelize";
import { NameModel, IModel } from "../integration/model/documentType";

export function create(seq: Sequelize) {
  const documentType = seq.define<Model<IModel>>(
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
        unique: true,
      },
      code: {
        type: DataTypes.STRING(2),
        allowNull: false,
        unique: true,
      },
      isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      //paranoid: true
    }
  );

  return documentType;
}

export { NameModel };

/**
 * Types
 */
export type IDocumentType = ReturnType<typeof create>;
