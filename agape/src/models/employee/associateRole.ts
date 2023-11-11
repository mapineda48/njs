import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ModelName as Role } from "./role";
import { ModelName as Associate } from "./associate";
import * as ORM from "../../util/models/orm";


export const ModelName = "employee_associateRole";

export function define(seq: Sequelize) {
  const role = seq.models[Role];
  const associate = seq.models[Associate];

  const associateRole = seq.define<Model<IDefine>>(
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
export type IModel = Model<IRecord, IData>;
export type IModelStatic = ModelStatic<Model<IRecord, IData>>;

export interface IRecord extends ORM.Record {
  associateId: number;
  roleId: number;
}

export type IDefine = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
