import { RestaurantService } from '.';
import Restaurant from '../database/models/Restaurant';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';

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
  const existingRestaurant = await Restaurant.findOne({
    where: {
      email: options.email,
    },
  });

  if (existingRestaurant) {
    throw new AppError(Errors.RESTAURANT_EXIST, 400);
  }

  await RestaurantService.createRestaurant({ ...options });
}

interface IDeleteRestaurantOptions {
  restaurantId: number;
}
export async function deleteRestaurant(options: IDeleteRestaurantOptions) {
  const existingRestaurant = await Restaurant.findOne({
    where: {
      id: options.restaurantId,
    },
  });

  if (!existingRestaurant) {
    throw new AppError(Errors.RESTAURANT_NOT_FOUND);
  }

  existingRestaurant.destroy();
}
