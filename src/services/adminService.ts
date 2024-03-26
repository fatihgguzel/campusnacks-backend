import Restaurant from '../database/models/Restaurant';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';

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
