import { Model } from 'sequelize';

abstract class BaseModel extends Model {
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

export default BaseModel;
