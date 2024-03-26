import Restaurant from '../database/models/Restaurant';
import RestaurantAddress from '../database/models/RestaurantAddress';
import sequelize from '../database/sequelize';

export async function createBusinessHours() {}

interface ICreateRestaurantOptions {
  name: string;
  phone: string;
  email: string;
  imageUrl?: string | null;
  hasDelivery: boolean;
  deliveryPrice?: number | null;
  minimumPrice: number;
  deliveryTime: number;
  isBusy: boolean;
  city: string;
  district: string;
  address: string;
  nHood?: string | null;
  street: string;
  no: number;
}

export async function createRestaurant(options: ICreateRestaurantOptions) {
  const restaurant = await sequelize.transaction(async (transaction) => {
    const address = await RestaurantAddress.create(
      {
        ...options,
      },
      {
        transaction,
      },
    );
    const restaurant = await Restaurant.create(
      {
        ...options,
        addressId: address.id,
      },
      {
        transaction,
      },
    );
    return restaurant;
  });
  return restaurant;
}
