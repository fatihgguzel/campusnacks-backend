import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { AuditLogTypes } from '../../types/enums';
import BaseModel from './BaseModel';

class AuditLog extends BaseModel {
  public id!: number;
  public logType!: string;
  public service!: string;
  public function!: string;
  public message!: string;
  public data!: object;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(AuditLogTypes)),
      defaultValue: AuditLogTypes.LOG,
      allowNull: false,
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    function: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default AuditLog;
