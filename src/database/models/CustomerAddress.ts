import { Association, BelongsToGetAssociationMixin, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import Address from './Address';
import Customer from './Customer';

class CustomerAddress extends Address {
  public readonly customer!: Customer;
  public getCustomerAddress!: BelongsToGetAssociationMixin<Customer>;

  public static associations: {
    customer: Association<CustomerAddress, Customer>;
  };
}

CustomerAddress.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default CustomerAddress;
