import Restaurant from '../database/models/Restaurant';
import RestaurantAddress from '../database/models/RestaurantAddress';
import sequelize from '../database/sequelize';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import { createAdminRestaurantBody, updateRestaurantBody, updateRestaurantParams } from '../types/requestObjects';

export async function createBusinessHours() {}

interface ICreateRestaurantOptions extends createAdminRestaurantBody {}

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

interface IUpdateRestaurant extends updateRestaurantBody, updateRestaurantParams {}

export async function updateRestaurant(options: IUpdateRestaurant) {
  await sequelize.transaction(async (transaction) => {
    const existingRestaurant = await Restaurant.findOne({
      where: {
        id: options.restaurantId,
      },
    });

    if (!existingRestaurant) {
      throw new AppError(Errors.RESTAURANT_NOT_EXIST, 404);
    }

    if (options.email && options.email !== existingRestaurant.email) {
      const existingRestaurantEmail = await isExistEmail(options.email);
      if (existingRestaurantEmail) {
        throw new AppError(Errors.RESTAURANT_EXIST, 400);
      }
    }
    await Restaurant.update(
      {
        ...existingRestaurant.dataValues,
        ...options,
      },
      {
        where: {
          id: existingRestaurant.id,
        },
        transaction,
      },
    );
  });
}

export async function isExistEmail(email: string) {
  const existingRestaurant = await Restaurant.findOne({
    where: {
      email: email,
    },
  });

  return existingRestaurant;
}
