import Restaurant from '../database/models/Restaurant';
import RestaurantAddress from '../database/models/RestaurantAddress';
import sequelize from '../database/sequelize';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import { toSlug, Logger } from '../helpers';

interface ICreateRestaurantOptions {
  name: string;
  phone: string;
  email: string;
  imageUrl?: string;
  city: string;
  district: string;
  address: string;
  nHood: string;
  street: string;
  no: string;
}

export async function createRestaurant(options: ICreateRestaurantOptions) {
  const restaurantAddress = [options.name, options.nHood, options.street, options.no].join(' ');
  const restaurantSlug = toSlug(restaurantAddress);

  const existingRestaurant = await Restaurant.findOne({
    where: {
      slug: restaurantSlug,
    },
  });

  if (existingRestaurant) {
    throw new AppError(Errors.RESTAURANT_EXIST, 400);
  }

  const restaurant = await sequelize.transaction(async (transaction) => {
    const address = await RestaurantAddress.create(
      {
        city: options.city,
        district: options.district,
        address: options.address,
        nHood: options.nHood,
        street: options.street,
        no: options.no,
      },
      {
        transaction,
      },
    );
    const restaurant = await Restaurant.create(
      {
        name: options.name,
        phone: options.phone,
        email: options.email,
        addressId: address.id,
        imageUrl: options.imageUrl || null,
        hasDelivery: true,
        minimumPrice: 0,
        deliveryTime: 0,
        isBusy: false,
        slug: restaurantSlug,
      },
      {
        transaction,
      },
    );
    return restaurant;
  });

  await Logger.log({
    service: 'restaurantService',
    function: 'createRestaurant',
    message: 'restaurant created',
    data: {
      ...options,
    },
  });

  return restaurant;
}

interface IUpdateRestaurantOptions {
  restaurantId: number;
  phone?: string;
  imageUrl?: string | null;
  hasDelivery?: boolean;
  deliveryPrice?: number | null;
  minimumPrice?: number;
  deliveryTime?: number;
  isBusy?: boolean;
  city?: string;
  district?: string;
  address?: string;
  nHood?: string;
  street?: string;
  no?: string;
}

export async function updateRestaurant(options: IUpdateRestaurantOptions) {
  const existingRestaurant = await Restaurant.findOne({
    where: {
      id: options.restaurantId,
    },
  });

  if (!existingRestaurant) {
    throw new AppError(Errors.RESTAURANT_NOT_EXIST, 404);
  }

  await sequelize.transaction(async (transaction) => {
    await existingRestaurant.update(
      {
        ...options,
      },
      {
        transaction,
      },
    );
  });
}
