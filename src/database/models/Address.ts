import BaseModel from './BaseModel';

abstract class Address extends BaseModel {
  public id!: number;
  public city!: string;
  public district!: string;
  public address!: string;
}

export default Address;
