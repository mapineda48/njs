import { Sequelize, Model, DataTypes } from "sequelize";
import { NameModel as DocumentType } from "../integration/model/documentType";
import { NameModel, IModel } from "../integration/model/user";

export function create(seq: Sequelize) {
  const documentType = seq.models[DocumentType];

  const user = seq.define<Model<IModel>>(
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
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      documentNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      //paranoid: true
    }
  );

  documentType.hasMany(user);
  user.belongsTo(documentType, {
    foreignKey: {
      name: "documentTypeId",
      allowNull: false,
    },
  });

  return user;
}

export { NameModel };

/**
 * Types
 */
export type IUser = ReturnType<typeof create>;
