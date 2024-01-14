import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { AuditLogTypes } from '../../types/enums';

class AuditLog extends Model {
  public id!: number;
  public logType!: string;
  public service!: string;
  public function!: string;
  public message!: string;
  public data!: object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
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
