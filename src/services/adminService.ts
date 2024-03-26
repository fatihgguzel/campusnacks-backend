import { RestaurantService } from '.';
import Restaurant from '../database/models/Restaurant';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import { createAdminRestaurantBody } from '../types/requestObjects';

interface ICreateRestaurantOptions extends createAdminRestaurantBody {}

export async function createRestaurant(options: ICreateRestaurantOptions) {
  const existingRestaurantEmail = await RestaurantService.isExistEmail(options.email);

  if (existingRestaurantEmail) {
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
