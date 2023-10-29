import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { IModel, IData, IRecord } from "@api/models/employee/associateRole";
import { toModelName } from "@util/models/toMap";
import { ModelName as Role } from "./role";
import { ModelName as Associate } from "./associate";

export const ModelName = toModelName(__filename);

export function define(seq: Sequelize) {
  const role = seq.models[Role];
  const associate = seq.models[Associate];

  const associateRole = seq.define<Model<IModel>>(
    ModelName,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      associateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      //paranoid: true
    }
  );

  role.hasMany(associateRole, { foreignKey: "roleId" });
  associateRole.belongsTo(role, { foreignKey: "roleId" });

  associate.hasMany(associateRole, { foreignKey: "associateId" });
  associateRole.belongsTo(associate, { foreignKey: "associateId" });

  return associateRole;
}

/**
 * Types
 */
export type IModelStatic = ModelStatic<Model<IRecord, IData>>;
